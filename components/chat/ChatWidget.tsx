"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2,
  Bot,
  User,
  Loader2
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Scott's AI assistant, powered by Amazon Bedrock AgentCore. I can answer questions about his experience, skills, and consulting services. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const currentResponseRef = useRef<string>("");
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Fetch presigned WebSocket URL and connect
  const connectToAgentCore = useCallback(async () => {
    if (isConnecting || wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setIsConnecting(true);

    try {
      // Get presigned WebSocket URL from API Gateway (Lambda function)
      // This endpoint is separate from Amplify and has proper AWS credentials
      const apiGatewayUrl = "https://fmfvkrcjl7.execute-api.us-east-1.amazonaws.com/prod/ws-url";
      const response = await fetch(`${apiGatewayUrl}?session_id=${sessionId}`);
      
      if (!response.ok) {
        throw new Error("Failed to get WebSocket URL");
      }

      const { websocket_url } = await response.json();

      if (!websocket_url) {
        console.log("WebSocket URL not available, using HTTP fallback");
        setIsConnecting(false);
        return;
      }

      // Connect to AgentCore WebSocket
      const ws = new WebSocket(websocket_url);
      
      ws.onopen = () => {
        setIsConnected(true);
        setIsConnecting(false);
        console.log("Connected to AgentCore WebSocket");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Handle different message types from AgentCore
          if (data.type === "chunk" || data.content) {
            const content = data.content || data.text || "";
            currentResponseRef.current += content;
            
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage?.role === "assistant" && lastMessage.id === "streaming") {
                return [
                  ...prev.slice(0, -1),
                  { ...lastMessage, content: currentResponseRef.current },
                ];
              }
              return prev;
            });
          } else if (data.type === "done" || data.type === "end") {
            setIsLoading(false);
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage?.id === "streaming") {
                return [
                  ...prev.slice(0, -1),
                  { ...lastMessage, id: `msg-${Date.now()}` },
                ];
              }
              return prev;
            });
            currentResponseRef.current = "";
          } else if (data.type === "error") {
            setIsLoading(false);
            setMessages((prev) => [
              ...prev.filter(m => m.id !== "streaming"),
              {
                id: `error-${Date.now()}`,
                role: "assistant",
                content: data.message || "Sorry, I encountered an error. Please try again.",
                timestamp: new Date(),
              },
            ]);
            currentResponseRef.current = "";
          } else if (data.response) {
            // Handle non-streaming response
            setIsLoading(false);
            setMessages((prev) => [
              ...prev.filter(m => m.id !== "streaming"),
              {
                id: `msg-${Date.now()}`,
                role: "assistant",
                content: data.response,
                timestamp: new Date(),
              },
            ]);
          }
        } catch (e) {
          // If it's plain text, treat it as content
          if (typeof event.data === "string") {
            currentResponseRef.current += event.data;
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage?.role === "assistant" && lastMessage.id === "streaming") {
                return [
                  ...prev.slice(0, -1),
                  { ...lastMessage, content: currentResponseRef.current },
                ];
              }
              return prev;
            });
          }
          console.error("Error parsing WebSocket message:", e);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
        console.log("WebSocket disconnected");
        
        // Attempt to reconnect after a delay if chat is still open
        if (isOpen && !reconnectTimeoutRef.current) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectTimeoutRef.current = null;
            if (isOpen) {
              connectToAgentCore();
            }
          }, 5000);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
        setIsConnecting(false);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("Failed to connect to AgentCore:", error);
      setIsConnecting(false);
      setConnectionFailed(true);
      
      // Add a message about the connection issue
      setMessages((prev) => {
        // Only add if we don't already have a connection error message
        if (prev.some(m => m.id === "connection-error")) return prev;
        return [
          ...prev,
          {
            id: "connection-error",
            role: "assistant",
            content: "I'm having trouble connecting to the AI backend right now. You can still type your questions and I'll do my best to help, or feel free to use the contact form at /contact to reach Scott directly.",
            timestamp: new Date(),
          },
        ];
      });
    }
  }, [isOpen, isConnecting, sessionId]);

  // Connect when widget opens
  useEffect(() => {
    if (isOpen && !wsRef.current) {
      connectToAgentCore();
    }
  }, [isOpen, connectToAgentCore]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      wsRef.current?.close();
    };
  }, []);

  const handleSendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      // Send via WebSocket
      currentResponseRef.current = "";
      setMessages((prev) => [
        ...prev,
        {
          id: "streaming",
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);
      
      // Send in AgentCore expected format
      wsRef.current.send(JSON.stringify({ 
        prompt: message,
        session_id: sessionId 
      }));
    } else {
      // Fallback mode - provide helpful response
      setIsLoading(false);
      
      // Generate a helpful offline response based on the question
      let response = "";
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes("experience") || lowerMessage.includes("background") || lowerMessage.includes("about")) {
        response = "Scott has 10+ years of experience in analytics, data science, and ML. He's an AWS Certified ML Engineer with expertise in statistical analysis, causal inference, and cloud architecture. He's delivered $17M+ in business impact at AWS. For more details, check out the About page or his case studies!";
      } else if (lowerMessage.includes("service") || lowerMessage.includes("help") || lowerMessage.includes("offer")) {
        response = "Scott offers consulting in: Statistical Analysis & Causal Inference, Machine Learning & AI, AWS Cloud Architecture, Business Intelligence, Data Engineering, and GenAI Governance. Visit the Services page for details, or use the Contact form to discuss your specific needs!";
      } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email")) {
        response = "You can reach Scott at leducse@gmail.com or through the Contact form at /contact. He typically responds within 24-48 hours. You can also connect on LinkedIn: linkedin.com/in/sleduc";
      } else if (lowerMessage.includes("case") || lowerMessage.includes("project") || lowerMessage.includes("example")) {
        response = "Check out Scott's case studies showcasing $706K annual revenue impact, 53% conversion improvements, and ML recommender systems. Visit the Case Studies page for detailed breakdowns with metrics and methodologies!";
      } else {
        response = "Thanks for your question! The AI assistant is currently in offline mode. Please visit the Contact page at /contact to reach Scott directly, or explore the website to learn more about his services and experience. Email: leducse@gmail.com";
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
      
      // Try to reconnect in background
      if (!isConnecting && !connectionFailed) {
        connectToAgentCore();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleOpen = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#0a1628] shadow-lg shadow-cyan-500/30 flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "60px" : "auto"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed bottom-6 right-6 z-50 w-[380px] ${
              isMinimized ? "h-[60px]" : "h-[600px]"
            } max-h-[80vh] bg-[#0a1628] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/30 bg-[#0f2744]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#0a1628]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Scott&apos;s AI Assistant
                  </h3>
                  <p className={`text-xs ${connectionFailed ? "text-amber-400" : "text-cyan-400"}`}>
                    {isConnecting ? "Connecting..." : isConnected ? "Online" : connectionFailed ? "Offline mode" : "Ready to chat"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minimize2 className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a1628]">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                          message.role === "user"
                            ? "bg-cyan-500/20"
                            : "bg-gradient-to-r from-cyan-500 to-cyan-400"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                          <Bot className="w-3.5 h-3.5 text-[#0a1628]" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                          message.role === "user"
                            ? "bg-cyan-500 text-[#0a1628] rounded-tr-md font-medium"
                            : "bg-[#0f2744] text-slate-100 rounded-tl-md border border-cyan-500/20"
                        }`}
                      >
                        {message.content || (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Thinking...
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.content === "" && (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <Bot className="w-3.5 h-3.5 text-[#0a1628]" />
                      </div>
                      <div className="px-4 py-2.5 rounded-2xl rounded-tl-md bg-[#0f2744] border border-cyan-500/20">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-cyan-500/30 bg-[#0a1628]">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask me anything..."
                      disabled={isLoading}
                      className="flex-1 px-4 py-2.5 bg-[#0f2744] border border-cyan-500/30 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="p-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#0a1628] rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Powered by Amazon Bedrock AgentCore
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
