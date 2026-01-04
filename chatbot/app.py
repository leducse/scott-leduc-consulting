"""Scott LeDuc Consulting Chatbot - AgentCore Application.

This module exposes the multi-agent chatbot via BedrockAgentCoreApp
for deployment to AWS Bedrock AgentCore Runtime.
"""

import asyncio
import json
import logging
import uuid
from typing import Dict, Any

from bedrock_agentcore import BedrockAgentCoreApp

from agents.multi_agent import agent

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create the AgentCore application
app = BedrockAgentCoreApp(debug=True)


@app.entrypoint
async def handle_invocation(request: Dict[str, Any], context=None) -> Dict[str, Any]:
    """Handle HTTP invocation requests.
    
    Expected request format:
    {
        "prompt": "User message",
        "session_id": "optional-session-id"
    }
    """
    prompt = request.get("prompt", "")
    session_id = request.get("session_id", str(uuid.uuid4()))
    
    if not prompt:
        return {"error": "No prompt provided"}
    
    try:
        # Collect streaming response
        response_text = ""
        async for chunk in agent.process_message(session_id, prompt):
            response_text += chunk
        
        return {
            "response": response_text,
            "session_id": session_id
        }
    except Exception as e:
        logger.exception("Error processing message")
        return {"error": str(e)}


@app.websocket
async def handle_websocket(websocket, context):
    """Handle WebSocket connections for real-time chat.
    
    Message format (client -> server):
    {
        "prompt": "User message",
        "session_id": "optional-session-id"
    }
    
    Message format (server -> client):
    {
        "type": "chunk" | "done" | "error",
        "content": "...",
        "session_id": "..."
    }
    """
    await websocket.accept()
    logger.info("WebSocket connection established")
    
    try:
        while True:
            # Receive message
            data = await websocket.receive_text()
            request = json.loads(data)
            
            prompt = request.get("prompt", "")
            session_id = request.get("session_id", str(uuid.uuid4()))
            
            if not prompt:
                await websocket.send_text(json.dumps({
                    "type": "error",
                    "content": "No prompt provided",
                    "session_id": session_id
                }))
                continue
            
            try:
                # Stream response chunks
                async for chunk in agent.process_message(session_id, prompt):
                    await websocket.send_text(json.dumps({
                        "type": "chunk",
                        "content": chunk,
                        "session_id": session_id
                    }))
                
                # Send done signal
                await websocket.send_text(json.dumps({
                    "type": "done",
                    "session_id": session_id
                }))
                
            except Exception as e:
                logger.exception("Error processing message")
                await websocket.send_text(json.dumps({
                    "type": "error",
                    "content": str(e),
                    "session_id": session_id
                }))
                
    except Exception as e:
        logger.info(f"WebSocket disconnected: {e}")


if __name__ == "__main__":
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    app.run(port=port)



