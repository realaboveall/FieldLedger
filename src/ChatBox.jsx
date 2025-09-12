import { useState } from "react";
import { SendHorizonal, Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Chatbox() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I’m your FieldLedger assistant. How can I help today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const botMsg = data.reply;
      setMessages([...newMessages, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ Error: Check Your Network Connection.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl rounded-2xl">
      <CardContent className="flex flex-col flex-grow p-4 overflow-hidden">
        {/* Messages */}
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}>
              {msg.role === "assistant" && (
                <Bot className="w-6 h-6 text-green-600 mt-1" />
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <User className="w-6 h-6 text-gray-500 mt-1" />
              )}
            </motion.div>
          ))}
          {loading && (
            <div className="text-gray-400 text-sm animate-pulse">
              Thinking...
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="flex items-center gap-2 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button
            onClick={sendMessage}
            disabled={loading}
            className="rounded-xl">
            <SendHorizonal className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
