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

interface ChatWidgetProps {
  websocketUrl?: string;
}

export default function ChatWidget({ websocketUrl }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Scott's AI assistant. I can answer questions about his experience, skills, and services, or help you think through data and analytics challenges. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const currentResponseRef = useRef<string>("");

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

  // Connect to WebSocket
  const connectWebSocket = useCallback(() => {
    if (!websocketUrl) {
      // Fallback to HTTP if no WebSocket URL
      return;
    }

    try {
      const ws = new WebSocket(websocketUrl);
      
      ws.onopen = () => {
        setIsConnected(true);
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === "chunk") {
          currentResponseRef.current += data.content;
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
        } else if (data.type === "done") {
          setIsLoading(false);
          // Finalize the streaming message
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
            ...prev,
            {
              id: `error-${Date.now()}`,
              role: "assistant",
              content: "Sorry, I encountered an error. Please try again.",
              timestamp: new Date(),
            },
          ]);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log("WebSocket disconnected");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("Failed to connect WebSocket:", error);
    }
  }, [websocketUrl]);

  // Connect when widget opens
  useEffect(() => {
    if (isOpen && websocketUrl && !wsRef.current) {
      connectWebSocket();
    }
  }, [isOpen, websocketUrl, connectWebSocket]);

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  const sendMessageViaHttp = async (message: string) => {
    try {
      // For local development, use the chatbot API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message, session_id: sessionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("HTTP request failed:", error);
      throw error;
    }
  };

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
      wsRef.current.send(
        JSON.stringify({ prompt: message, session_id: sessionId })
      );
    } else {
      // Fallback to HTTP
      try {
        const response = await sendMessageViaHttp(message);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            role: "assistant",
            content: response,
            timestamp: new Date(),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: "Sorry, I'm having trouble connecting. Please try again later or use the contact form.",
            timestamp: new Date(),
          },
        ]);
      }
      setIsLoading(false);
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
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-[var(--deep-navy)] shadow-lg shadow-cyan-500/30 flex items-center justify-center"
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
                  <Bot className="w-4 h-4 text-[var(--deep-navy)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Scott&apos;s AI Assistant
                  </h3>
                  <p className="text-xs text-cyan-400">
                    {isConnected ? "Online" : "Ready to chat"}
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
                          <Bot className="w-3.5 h-3.5 text-[var(--deep-navy)]" />
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
                        <Bot className="w-3.5 h-3.5 text-[var(--deep-navy)]" />
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
                    Powered by Amazon Bedrock
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

