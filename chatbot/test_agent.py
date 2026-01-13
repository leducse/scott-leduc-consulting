"""Test script for the Scott LeDuc Consulting chatbot."""

import asyncio
import sys

# Add agents to path
sys.path.insert(0, ".")

from agents.multi_agent import agent


async def test_interview_questions():
    """Test interview-style questions."""
    print("\n" + "="*60)
    print("Testing Interview Agent")
    print("="*60)
    
    questions = [
        "Tell me about yourself",
        "What are your key skills?",
        "What was your biggest achievement at AWS?",
    ]
    
    session_id = "test-interview"
    
    for question in questions:
        print(f"\n🧑 User: {question}")
        print("🤖 Scott: ", end="", flush=True)
        
        async for chunk in agent.process_message(session_id, question):
            print(chunk, end="", flush=True)
        
        print()


async def test_consultant_questions():
    """Test consulting-style questions."""
    print("\n" + "="*60)
    print("Testing Consultant Agent")
    print("="*60)
    
    questions = [
        "How would you approach measuring the ROI of a new program?",
        "What's the best way to build a recommendation system?",
    ]
    
    session_id = "test-consultant"
    
    for question in questions:
        print(f"\n🧑 User: {question}")
        print("🤖 Consultant: ", end="", flush=True)
        
        async for chunk in agent.process_message(session_id, question):
            print(chunk, end="", flush=True)
        
        print()


async def test_contact_flow():
    """Test contact handler flow."""
    print("\n" + "="*60)
    print("Testing Contact Handler")
    print("="*60)
    
    messages = [
        "I'd like to get in touch with Scott",
        "John Smith",
        "john@example.com",
        "I need help building a data pipeline for my startup",
    ]
    
    session_id = "test-contact"
    
    for message in messages:
        print(f"\n🧑 User: {message}")
        print("🤖 Assistant: ", end="", flush=True)
        
        async for chunk in agent.process_message(session_id, message):
            print(chunk, end="", flush=True)
        
        print()


async def interactive_chat():
    """Run an interactive chat session."""
    print("\n" + "="*60)
    print("Interactive Chat with Scott LeDuc AI")
    print("Type 'quit' to exit, 'reset' to start new session")
    print("="*60)
    
    session_id = "interactive"
    
    while True:
        try:
            user_input = input("\n🧑 You: ").strip()
            
            if user_input.lower() == "quit":
                print("Goodbye!")
                break
            elif user_input.lower() == "reset":
                session_id = f"interactive-{asyncio.get_event_loop().time()}"
                print("Session reset!")
                continue
            elif not user_input:
                continue
            
            print("🤖 Scott: ", end="", flush=True)
            
            async for chunk in agent.process_message(session_id, user_input):
                print(chunk, end="", flush=True)
            
            print()
            
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break


async def main():
    """Run all tests or interactive mode."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Test the chatbot")
    parser.add_argument("--interactive", "-i", action="store_true", help="Run interactive chat")
    parser.add_argument("--interview", action="store_true", help="Test interview agent")
    parser.add_argument("--consultant", action="store_true", help="Test consultant agent")
    parser.add_argument("--contact", action="store_true", help="Test contact handler")
    
    args = parser.parse_args()
    
    if args.interactive:
        await interactive_chat()
    elif args.interview:
        await test_interview_questions()
    elif args.consultant:
        await test_consultant_questions()
    elif args.contact:
        await test_contact_flow()
    else:
        # Run all tests
        await test_interview_questions()
        await test_consultant_questions()
        # Skip contact test by default to avoid sending emails
        print("\n⚠️ Skipping contact test (would send email)")


if __name__ == "__main__":
    asyncio.run(main())






