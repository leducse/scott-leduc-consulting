"""Multi-agent chatbot for Scott LeDuc Consulting.

This module implements a routing-based multi-agent system using Amazon Bedrock
for LLM inference and Bedrock Knowledge Bases for RAG.
"""

import json
import re
import logging
from typing import AsyncGenerator, Dict, Optional, Any, List
from dataclasses import dataclass, field

import boto3

from .config import (
    AWS_REGION,
    KNOWLEDGE_BASE_ID,
    USE_EMBEDDED_KNOWLEDGE,
    CONTACT_EMAIL,
    SES_FROM_EMAIL,
    ROUTING_MODEL,
    INTERVIEW_MODEL,
    CONSULTANT_MODEL,
    CONTACT_MODEL,
    ROUTING_SYSTEM_PROMPT,
    INTERVIEW_SYSTEM_PROMPT,
    CONSULTANT_SYSTEM_PROMPT,
    CONTACT_SYSTEM_PROMPT,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class ConversationContext:
    """Tracks conversation state including contact info collection."""
    messages: List[Dict[str, str]] = field(default_factory=list)
    current_agent: str = "INTERVIEW_AGENT"
    contact_info: Dict[str, Optional[str]] = field(default_factory=lambda: {
        "name": None,
        "email": None,
        "topic": None
    })
    interaction_count: int = 0
    
    def add_message(self, role: str, content: str):
        """Add a message to the conversation history."""
        self.messages.append({"role": role, "content": content})
        if role == "user":
            self.interaction_count += 1
    
    def get_recent_messages(self, n: int = 10) -> List[Dict[str, str]]:
        """Get the n most recent messages."""
        return self.messages[-n:]
    
    def has_complete_contact_info(self) -> bool:
        """Check if all contact info fields are filled."""
        return all(self.contact_info.values())


class ScottLeducAgent:
    """Multi-agent chatbot for Scott LeDuc Consulting."""
    
    def __init__(self):
        """Initialize the agent with Bedrock clients."""
        self.bedrock_runtime = boto3.client(
            "bedrock-runtime",
            region_name=AWS_REGION
        )
        self.bedrock_agent_runtime = boto3.client(
            "bedrock-agent-runtime",
            region_name=AWS_REGION
        )
        self.ses_client = boto3.client(
            "ses",
            region_name=AWS_REGION
        )
        self.conversations: Dict[str, ConversationContext] = {}
    
    def get_or_create_context(self, session_id: str) -> ConversationContext:
        """Get or create a conversation context for a session."""
        if session_id not in self.conversations:
            self.conversations[session_id] = ConversationContext()
        return self.conversations[session_id]
    
    def _invoke_model(
        self,
        model_id: str,
        system_prompt: str,
        messages: List[Dict[str, str]],
        max_tokens: int = 1024
    ) -> str:
        """Invoke a Bedrock model with the given prompts."""
        try:
            response = self.bedrock_runtime.converse(
                modelId=model_id,
                system=[{"text": system_prompt}],
                messages=[
                    {"role": m["role"], "content": [{"text": m["content"]}]}
                    for m in messages
                ],
                inferenceConfig={
                    "maxTokens": max_tokens,
                    "temperature": 0.7,
                }
            )
            return response["output"]["message"]["content"][0]["text"]
        except Exception as e:
            logger.error(f"Error invoking model {model_id}: {e}")
            raise
    
    async def _invoke_model_streaming(
        self,
        model_id: str,
        system_prompt: str,
        messages: List[Dict[str, str]],
        max_tokens: int = 1024
    ) -> AsyncGenerator[str, None]:
        """Invoke a Bedrock model with streaming response."""
        try:
            response = self.bedrock_runtime.converse_stream(
                modelId=model_id,
                system=[{"text": system_prompt}],
                messages=[
                    {"role": m["role"], "content": [{"text": m["content"]}]}
                    for m in messages
                ],
                inferenceConfig={
                    "maxTokens": max_tokens,
                    "temperature": 0.7,
                }
            )
            
            for event in response["stream"]:
                if "contentBlockDelta" in event:
                    delta = event["contentBlockDelta"]["delta"]
                    if "text" in delta:
                        yield delta["text"]
        except Exception as e:
            logger.error(f"Error invoking model {model_id}: {e}")
            raise
    
    def _retrieve_from_knowledge_base(self, query: str, top_k: int = 5) -> str:
        """Retrieve relevant context from the knowledge base.
        
        NOTE: When USE_EMBEDDED_KNOWLEDGE is True, this returns empty string
        because all knowledge is already embedded in the system prompts.
        This saves ~$175/month in OpenSearch Serverless costs.
        """
        # Skip KB retrieval when using embedded knowledge (saves ~$175/month)
        if USE_EMBEDDED_KNOWLEDGE or not KNOWLEDGE_BASE_ID:
            logger.debug("Using embedded knowledge - skipping KB retrieval")
            return ""
        
        try:
            response = self.bedrock_agent_runtime.retrieve(
                knowledgeBaseId=KNOWLEDGE_BASE_ID,
                retrievalQuery={"text": query},
                retrievalConfiguration={
                    "vectorSearchConfiguration": {
                        "numberOfResults": top_k
                    }
                }
            )
            
            # Combine retrieved chunks into context
            contexts = []
            for result in response.get("retrievalResults", []):
                content = result.get("content", {}).get("text", "")
                if content:
                    contexts.append(content)
            
            return "\n\n---\n\n".join(contexts) if contexts else ""
        except Exception as e:
            logger.error(f"Error retrieving from knowledge base: {e}")
            return ""
    
    def _route_message(self, user_message: str, context: ConversationContext) -> Dict[str, Any]:
        """Route the message to the appropriate agent."""
        # Check for explicit contact triggers
        contact_keywords = ["contact", "get in touch", "schedule", "call", "reach out", "hire", "pricing", "rates"]
        if any(keyword in user_message.lower() for keyword in contact_keywords):
            return {"route": "CONTACT_HANDLER", "confidence": 0.95, "reason": "Explicit contact request"}
        
        # Check interaction count - after 5 interactions, offer to connect
        if context.interaction_count >= 5 and context.current_agent != "CONTACT_HANDLER":
            # Don't force contact, but include a note
            pass
        
        # If already in contact flow, stay there until complete
        if context.current_agent == "CONTACT_HANDLER" and not context.has_complete_contact_info():
            return {"route": "CONTACT_HANDLER", "confidence": 1.0, "reason": "Continuing contact flow"}
        
        try:
            # Use LLM for routing
            routing_response = self._invoke_model(
                ROUTING_MODEL,
                ROUTING_SYSTEM_PROMPT,
                [{"role": "user", "content": user_message}],
                max_tokens=200
            )
            
            # Parse JSON response
            # Try to extract JSON from response
            json_match = re.search(r'\{[^}]+\}', routing_response, re.DOTALL)
            if json_match:
                route_data = json.loads(json_match.group())
            else:
                route_data = {"route": "INTERVIEW_AGENT", "confidence": 0.5, "reason": "Parsing failed"}
            
            # Apply confidence threshold
            if route_data.get("confidence", 0) < 0.6:
                route_data["route"] = "INTERVIEW_AGENT"
            
            return route_data
        except Exception as e:
            logger.error(f"Routing error: {e}")
            return {"route": "INTERVIEW_AGENT", "confidence": 0.5, "reason": f"Error: {e}"}
    
    def _extract_contact_info(self, message: str, current_info: Dict[str, Optional[str]]) -> Dict[str, Optional[str]]:
        """Extract contact information from a message."""
        updated = current_info.copy()
        
        # Extract email
        email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', message)
        if email_match:
            updated["email"] = email_match.group()
        
        # If we don't have a name and this looks like just a name (no email, short)
        if not updated["name"] and len(message.split()) <= 4 and not email_match:
            # Assume short messages without email might be names
            if not any(word in message.lower() for word in ["want", "would", "like", "interested", "help", "need"]):
                updated["name"] = message.strip()
        
        # If we have name and email but not topic, the message might be the topic
        if updated["name"] and updated["email"] and not updated["topic"]:
            if len(message) > 10 and not email_match:  # Longer message without email is probably topic
                updated["topic"] = message.strip()
        
        return updated
    
    async def _send_contact_email(self, contact_info: Dict[str, str], conversation_summary: str) -> bool:
        """Send contact notification email via SES."""
        try:
            subject = f"[Website Inquiry] New message from {contact_info['name']}"
            body = f"""Hi Scott,

You have a new inquiry from your consulting website:

Name: {contact_info['name']}
Email: {contact_info['email']}

Topic/Message:
{contact_info['topic']}

Conversation Context:
{conversation_summary}

---
Sent via Scott LeDuc Consulting AI Assistant
"""
            
            self.ses_client.send_email(
                Source=SES_FROM_EMAIL,
                Destination={"ToAddresses": [CONTACT_EMAIL]},
                Message={
                    "Subject": {"Data": subject, "Charset": "UTF-8"},
                    "Body": {"Text": {"Data": body, "Charset": "UTF-8"}}
                }
            )
            logger.info(f"Contact email sent for {contact_info['name']}")
            return True
        except Exception as e:
            logger.error(f"Failed to send contact email: {e}")
            return False
    
    async def _handle_interview_agent(
        self,
        user_message: str,
        context: ConversationContext
    ) -> AsyncGenerator[str, None]:
        """Handle interview-style questions about Scott."""
        # Knowledge is now embedded directly in INTERVIEW_SYSTEM_PROMPT
        # This saves ~$175/month vs OpenSearch Serverless
        
        # Get recent conversation history
        messages = context.get_recent_messages(6)
        messages.append({"role": "user", "content": user_message})
        
        async for chunk in self._invoke_model_streaming(
            INTERVIEW_MODEL,
            INTERVIEW_SYSTEM_PROMPT,
            messages
        ):
            yield chunk
    
    async def _handle_consultant_agent(
        self,
        user_message: str,
        context: ConversationContext
    ) -> AsyncGenerator[str, None]:
        """Handle consulting-style problem-solving questions."""
        # Knowledge is now embedded directly in CONSULTANT_SYSTEM_PROMPT
        # This saves ~$175/month vs OpenSearch Serverless
        
        # Get recent conversation history
        messages = context.get_recent_messages(6)
        messages.append({"role": "user", "content": user_message})
        
        async for chunk in self._invoke_model_streaming(
            CONSULTANT_MODEL,
            CONSULTANT_SYSTEM_PROMPT,
            messages
        ):
            yield chunk
    
    async def _handle_contact_handler(
        self,
        user_message: str,
        context: ConversationContext
    ) -> AsyncGenerator[str, None]:
        """Handle contact information collection."""
        # Extract any contact info from the message
        context.contact_info = self._extract_contact_info(user_message, context.contact_info)
        
        # Check if we have complete info
        if context.has_complete_contact_info():
            # Send the email
            conversation_summary = "\n".join([
                f"{m['role']}: {m['content'][:100]}..."
                for m in context.get_recent_messages(5)
            ])
            
            email_sent = await self._send_contact_email(
                context.contact_info,
                conversation_summary
            )
            
            if email_sent:
                confirmation = f"Thanks, {context.contact_info['name']}! I've sent your message to Scott at {CONTACT_EMAIL}. He typically responds within 24-48 hours. In the meantime, feel free to explore the case studies on the website!"
            else:
                confirmation = f"Thanks, {context.contact_info['name']}! I've noted your information. Scott will reach out to you at {context.contact_info['email']} within 24-48 hours."
            
            yield confirmation
        else:
            # Build prompt with current state
            contact_prompt = CONTACT_SYSTEM_PROMPT.format(
                name=context.contact_info.get("name") or "Not provided",
                email=context.contact_info.get("email") or "Not provided",
                topic=context.contact_info.get("topic") or "Not provided"
            )
            
            messages = context.get_recent_messages(4)
            messages.append({"role": "user", "content": user_message})
            
            async for chunk in self._invoke_model_streaming(
                CONTACT_MODEL,
                contact_prompt,
                messages
            ):
                yield chunk
    
    async def process_message(
        self,
        session_id: str,
        user_message: str
    ) -> AsyncGenerator[str, None]:
        """Process a user message and return a streaming response."""
        context = self.get_or_create_context(session_id)
        
        # Add user message to history
        context.add_message("user", user_message)
        
        # Route the message
        route_data = self._route_message(user_message, context)
        route = route_data.get("route", "INTERVIEW_AGENT")
        context.current_agent = route
        
        logger.info(f"Session {session_id}: Routed to {route} (confidence: {route_data.get('confidence', 0):.2f})")
        
        # Collect full response for history
        full_response = ""
        
        # Handle based on route
        if route == "INTERVIEW_AGENT":
            async for chunk in self._handle_interview_agent(user_message, context):
                full_response += chunk
                yield chunk
        elif route == "CONSULTANT_AGENT":
            async for chunk in self._handle_consultant_agent(user_message, context):
                full_response += chunk
                yield chunk
        elif route == "CONTACT_HANDLER":
            async for chunk in self._handle_contact_handler(user_message, context):
                full_response += chunk
                yield chunk
        
        # Add assistant response to history
        context.add_message("assistant", full_response)


# Create global agent instance
agent = ScottLeducAgent()

