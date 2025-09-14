import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Bot, User } from "lucide-react";
import { ExecutionMethod } from "appwrite";
import { functions } from "@/auth/appwriteConfig";

// --- LocalStorage helpers ---
const loadTransactions = () => {
  try {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  } catch {
    return [];
  }
};
const saveTransaction = (tx) => {
  const existing = loadTransactions();
  const updated = [tx, ...existing];
  localStorage.setItem("transactions", JSON.stringify(updated));
};

// --- Typing Dots Animation ---
const TypingDots = ({ text }) => (
  <div className="flex items-center gap-1">
    <span>{text}</span>
    <span className="animate-pulse">.</span>
    <span className="animate-pulse delay-150">.</span>
    <span className="animate-pulse delay-300">.</span>
  </div>
);

export default function Chatbox() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your FieldLedger assistant. Choose a mode below to start.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("chat"); // chat | register | verify | update

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const functionID = import.meta.env.VITE_APPWRITE_CHATGPT_FUNCTION_ID;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    setInput("");
    setLoading(true);

    try {
      const execution = await functions.createExecution({
        functionId: functionID,
        body: JSON.stringify({ mode, messages: newMessages }),
        async: false,
        path: `/`,
        method: ExecutionMethod.POST,
        headers: { "Content-Type": "application/json" },
      });

      let assistantReply = "⚠️ No response received.";
      let inner = null;

      if (execution.responseBody) {
        try {
          const outer = JSON.parse(execution.responseBody);
          inner = JSON.parse(outer.response || "{}");
          assistantReply = inner.reply?.content || assistantReply;
        } catch (parseErr) {
          console.error("❌ Parsing error:", parseErr);
          assistantReply = "⚠️ Error parsing response.";
        }
      }

      // If CID is returned → staged blockchain/IPFS flow
      if (inner?.cid) {
        const msg1 = {
          role: "assistant",
          content: "⛓️ Accessing Polygon blockchain",
          loading: true,
        };
        setMessages([...newMessages, msg1]);

        await new Promise((r) => setTimeout(r, 5000));

        const msg2 = {
          role: "assistant",
          content: "📦 Storing data on IPFS",
          loading: true,
        };
        setMessages((prev) => [...prev, msg2]);

        await new Promise((r) => setTimeout(r, 3000));

        const finalMsg = {
          role: "assistant",
          content:
            "✅ Product stored on IPFS.\n\n" +
            `🔗 CID: ${inner.cid}\n🌐 [View on IPFS](${inner.gatewayUrl})`,
          qrDataUrl: inner.qrDataUrl || null,
          loading: false,
        };
        setMessages((prev) => [...prev, finalMsg]);

        // Save locally
        const tx = {
          cid: inner.cid,
          product: inner.product || {},
          messages: [...newMessages, msg1, msg2, finalMsg],
          createdAt: new Date().toISOString(),
        };
        saveTransaction(tx);
      } else {
        // Normal reply (no CID)
        const assistantMsg = {
          role: "assistant",
          content: assistantReply,
          loading: false,
        };
        setMessages([...newMessages, assistantMsg]);
      }
    } catch (err) {
      console.error("❌ Request error:", err);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `⚠️ Error: ${err.message || "Check your connection."}`,
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

  // Mode buttons
  const ModeButton = ({ value, label, icon }) => (
    <button
      onClick={() => setMode(value)}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        mode === value
          ? "bg-green-600 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}>
      {icon} {label}
    </button>
  );

  return (
    <div className="w-[27vw] max-w-2xl h-[70vh] flex flex-col shadow-2xl rounded-3xl border bg-foreground text-white">
      {/* Mode buttons */}
      <div className="flex justify-around p-3 border-b border-gray-600">
        <ModeButton value="chat" label="Chat" icon="💬" />
        <ModeButton value="register" label="Register" icon="📝" />
        <ModeButton value="verify" label="Verify" icon="🔍" />
        <ModeButton value="update" label="Update" icon="♻️" />
      </div>

      {/* Messages */}
      <div className="flex flex-col flex-grow p-4 overflow-hidden">
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}>
              {msg.role === "assistant" && (
                <Bot className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm break-words whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}>
                {msg.loading ? (
                  <TypingDots text={msg.content} />
                ) : (
                  <>
                    {msg.content}
                    {msg.qrDataUrl && (
                      <img
                        src={msg.qrDataUrl}
                        alt="QR Code"
                        className="mt-2 w-32 h-32 rounded-lg border"
                      />
                    )}
                  </>
                )}
              </div>
              {msg.role === "user" && (
                <User className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-green-600" />
              <div className="text-gray-400 text-sm animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
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
            className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
