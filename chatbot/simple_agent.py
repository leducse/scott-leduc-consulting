"""Simple test agent for Scott LeDuc Consulting."""
from bedrock_agentcore import BedrockAgentCoreApp

app = BedrockAgentCoreApp()

@app.entrypoint
def invoke(payload):
    """Simple echo handler for testing."""
    prompt = payload.get("prompt", "Hello!")
    return {
        "response": f"Scott's AI received: {prompt}. This is a test response.",
        "status": "success"
    }

if __name__ == "__main__":
    app.run()
