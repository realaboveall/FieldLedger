import { useState } from "react";
import { SendHorizonal, Bot, User } from "lucide-react";

export default function Chatbox() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm your FieldLedger assistant. How can I help today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Environment variables with fallbacks
  const endpoint = import.meta.env.VITE_APPWRITE_FUNCTION_ENDPOINT 
  const functionID = import.meta.env.VITE_APPWRITE_CHATGPT_FUNCTION_ID
  const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID 

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Use https:// for production, check if endpoint includes protocol
      // const protocol = endpoint.includes('://') ? '' : 'https://';
      const url = `https://${endpoint}/v1/functions/${functionID}/executions`;
      
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": projectID,
        },
        credentials: "include",
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.response) {
        try {
          const parsed = JSON.parse(data.response);
          if (parsed.reply && typeof parsed.reply === 'object') {
            setMessages([...newMessages, parsed.reply]);
          } else {
            throw new Error("Invalid reply format");
          }
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          setMessages([
            ...newMessages,
            {
              role: "assistant",
              content: "⚠️ Error: Unable to parse server response.",
            },
          ]);
        }
      } else {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "⚠️ Error: No response received from server.",
          },
        ]);
      }
    } catch (err) {
      console.error("Request error:", err);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `⚠️ Error: ${err.message || "Check your network connection."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl rounded-2xl border bg-white">
      <div className="flex flex-col flex-grow p-4 overflow-hidden">
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <Bot className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm break-words ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <User className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-green-600" />
              <div className="text-gray-400 text-sm animate-pulse">Thinking...</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !input.trim()}
            className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}