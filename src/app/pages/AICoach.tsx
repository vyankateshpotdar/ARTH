import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion } from "motion/react";
import { Send, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  quickReplies?: string[];
}

import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export function AICoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hey! 👋 I'm your AI finance coach. I noticed you spent ₹3,200 on food this week. That's 40% more than usual. Want to create a savings plan?",
      quickReplies: ["Yes, help me save", "Show my stats", "Ignore"],
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const aiResponses = [
    "Great! Let's start by reducing dining out by just 2 times this week. That could save you around ₹800! 💪",
    "Your spending pattern looks good! You're 15% under budget this month 🎉",
    "I recommend setting aside ₹500 daily for the next week. You'll hit your emergency fund goal faster! 🚀",
    "Bro, you spent too much on Swiggy this month 😅 Let's plan some home-cooked meals?",
    "Nice! You've maintained a 7-day saving streak. Keep it up and earn 50 XP! ⭐",
  ];

  const getGeminiResponse = async (prompt: string, fallback: string) => {
    if (!genAI) return fallback;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const context = "You are a friendly, Gen-Z finance coach. Keep responses bite-sized, engaging, and under 2-3 sentences. Use emojis. User prompt: ";
      const result = await model.generateContent(context + prompt);
      return result.response.text();
    } catch (error) {
      console.error("Gemini Error:", error);
      return fallback;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userPrompt = inputValue;
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userPrompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    const fallbackResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    const aiText = await getGeminiResponse(userPrompt, fallbackResponse);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content: aiText,
      quickReplies: ["Thanks!", "Tell me more", "Show plan"],
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleQuickReply = async (reply: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: reply,
    };

    setMessages((prev) => [...prev, userMessage]);

    const fallbackResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    const aiText = await getGeminiResponse(reply, fallbackResponse);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content: aiText,
      quickReplies: ["Thanks!", "Tell me more", "Show plan"],
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="p-4 pt-8 pb-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(127,90,240,0.5)]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Coach</h1>
              <p className="text-white/60 text-sm">Your financial buddy</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] ${
                message.type === "user" ? "order-2" : "order-1"
              }`}
            >
              {message.type === "ai" && (
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mb-1">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <GlassCard className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
                      <p className="text-white/90 text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </GlassCard>

                    {/* Quick Replies */}
                    {message.quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.quickReplies.map((reply) => (
                          <Button
                            key={reply}
                            onClick={() => handleQuickReply(reply)}
                            size="sm"
                            variant="outline"
                            className="h-8 bg-white/5 border-white/10 text-white/80 hover:bg-white/10 rounded-xl text-xs"
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Feedback buttons */}
                    <div className="flex gap-2 mt-2">
                      <button className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <ThumbsUp className="w-3 h-3 text-white/40" />
                      </button>
                      <button className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <ThumbsDown className="w-3 h-3 text-white/40" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {message.type === "user" && (
                <GlassCard className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                  <p className="text-white text-sm leading-relaxed">
                    {message.content}
                  </p>
                </GlassCard>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Suggested Actions */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            size="sm"
            variant="outline"
            className="h-9 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl whitespace-nowrap"
            onClick={() => handleQuickReply("Show my spending")}
          >
            📊 Show my spending
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-9 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl whitespace-nowrap"
            onClick={() => handleQuickReply("Create savings plan")}
          >
            💰 Create savings plan
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-9 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl whitespace-nowrap"
            onClick={() => handleQuickReply("Give me tips")}
          >
            💡 Give me tips
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 pt-2">
        <GlassCard gradient className="p-2">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0 h-10"
            />
            <Button
              onClick={handleSend}
              size="sm"
              disabled={!inputValue.trim()}
              className="h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-[0_0_15px_rgba(127,90,240,0.4)] disabled:opacity-50 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
