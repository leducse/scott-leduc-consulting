import { NextRequest, NextResponse } from "next/server";

// Chatbot backend URL - configure this based on environment
const CHATBOT_URL = process.env.CHATBOT_URL || "http://localhost:8080";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, session_id } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "No prompt provided" },
        { status: 400 }
      );
    }

    // Forward request to the chatbot backend
    const response = await fetch(`${CHATBOT_URL}/invocations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        session_id: session_id || `web-${Date.now()}`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Chatbot backend error:", errorText);
      return NextResponse.json(
        { error: "Failed to get response from chatbot" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    
    // If the chatbot backend is not available, return a helpful message
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json({
        response: "The AI assistant is currently being set up. In the meantime, please use the contact form or email leducse@gmail.com to get in touch with Scott directly.",
        session_id: "fallback",
      });
    }

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

