import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Bot, User } from "lucide-react";
import { ExecutionMethod } from "appwrite";
import { functions } from "./auth/appwriteConfig";
import { useUser } from "@/auth/UserContext";

// --- Typing Dots Animation ---
const TypingDots = ({ text }) => (
  <div className="flex items-center gap-1">
    <span>{text}</span>
    <span className="animate-pulse">.</span>
    <span className="animate-pulse delay-150">.</span>
    <span className="animate-pulse delay-300">.</span>
  </div>
);

export default function Chatbox({ defaultMode = "chat" }) {
  const { saveTransactionLocal, saveChatLogsLocal } = useUser();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your FieldLedger assistant. Choose a mode and language to start.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(defaultMode); // chat | register | verify | update
  const [lang, setLang] = useState("en"); // default English

  // Voice state
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const messagesEndRef = useRef(null);
  const functionID = import.meta.env.VITE_APPWRITE_CHATGPT_FUNCTION_ID;

  // --- Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Init Speech Recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang =
        lang === "hi" ? "hi-IN" : lang === "es" ? "es-ES" : "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript); // put speech into input
      };

      recognition.onerror = (err) => {
        console.error("🎤 Speech recognition error:", err);
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // --- Text-to-Speech
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang =
      lang === "hi" ? "hi-IN" : lang === "es" ? "es-ES" : "en-US";
    speechSynthesis.speak(utterance);
  };

  // --- Send Message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    setInput("");
    setLoading(true);

    try {
      let bodyPayload = { mode, messages: newMessages, lang };

      // Strict Verify Mode → extract CID from anywhere in input
      const CID_REGEX = /[a-zA-Z0-9]{46,59}/;
      const match = userMsg.content.match(CID_REGEX);
      if (mode === "verify" && match) {
        bodyPayload = { mode: "verify", cid: match[0], lang };
      }

      const execution = await functions.createExecution({
        functionId: functionID,
        body: JSON.stringify(bodyPayload),
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

      // ✅ Handle Verify flow separately
      if (mode === "verify" && inner?.product) {
        const verifyMsg = {
          role: "assistant",
          content:
            `🔍 Verified product:\n\n` +
            `🆔 ID: ${inner.product.productId || "N/A"}\n` +
            `📦 Name: ${inner.product.name || "N/A"}\n` +
            `💰 Price: ₹${inner.product.price || "N/A"}\n` +
            `🌍 Origin: ${inner.product.origin || "N/A"}\n` +
            `\n🔗 [View on IPFS](${inner.gatewayUrl})`,
          loading: false,
        };
        setMessages([...newMessages, verifyMsg]);
        speak(verifyMsg.content);

        // Save chat log for verify flow too
        if (inner.cid) {
          saveChatLogsLocal(inner.cid, [...newMessages, verifyMsg]);
        }
        return;
      }

      // ✅ Register flow → staged blockchain/IPFS animation
      if (mode === "register" && inner?.cid) {
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
        const allMsgs = [...newMessages, msg1, msg2, finalMsg];
        setMessages(allMsgs);
        speak(finalMsg.content);

        // Save locally → transaction + chat logs
        const tx = {
          cid: inner.cid,
          product: inner.product || {},
          messages: allMsgs,
          createdAt: new Date().toISOString(),
        };
        saveTransactionLocal(tx);
        saveChatLogsLocal(inner.cid, allMsgs);
        return;
      }
      if (mode === "update") {
        const CID_REGEX = /[a-zA-Z0-9]{46,59}/;
        const match = userMsg.content.match(CID_REGEX);

        // Step 1: User provides CID (no product yet)
        if (match && !inner?.product) {
          const cid = match[0];
          const updateMsg = {
            role: "assistant",
            content: `📦 CID received: ${cid}\nNow tell me what you want to update (e.g., "price: 200").`,
          };
          setMessages([...newMessages, updateMsg]);
          return;
        }

        // Step 2: Backend returns updated product + new CID
        if (inner?.cid && inner?.product) {
          const finalMsg = {
            role: "assistant",
            content:
              `♻️ Product updated successfully!\n\n` +
              `🔗 New CID: ${inner.cid}\n🌐 [View on IPFS](${inner.gatewayUrl})`,
            qrDataUrl: inner.qrDataUrl || null,
          };
          const allMsgs = [...newMessages, finalMsg];
          setMessages(allMsgs);

          // Save locally
          saveTransactionLocal({
            cid: inner.cid,
            product: inner.product,
            messages: allMsgs,
            createdAt: new Date().toISOString(),
          });
          saveChatLogsLocal(inner.cid, allMsgs);
          return;
        }
      }

      // ✅ Normal reply (Chat mode / Fallback)
      const assistantMsg = {
        role: "assistant",
        content: assistantReply,
        loading: false,
      };
      const allMsgs = [...newMessages, assistantMsg];
      setMessages(allMsgs);
      speak(assistantReply);

      // Save chat logs (no CID yet, fallback to temp)
      saveChatLogsLocal("general", allMsgs);
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
      {/* Mode buttons + language dropdown */}
      <div className="flex justify-between items-center p-3 border-b border-gray-600">
        <div className="flex gap-2">
          <ModeButton value="register" label="Register" icon="📝" />
          <ModeButton value="verify" label="Verify" icon="🔍" />
          <ModeButton value="update" label="Update" icon="♻️" />
        </div>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="bg-gray-700 text-white text-sm rounded-lg px-2 py-1">
          <option value="en">🇬🇧 English</option>
          <option value="hi">🇮🇳 Hindi</option>
        </select>
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

        {/* Input + Voice */}
        <div className="flex items-center gap-2 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message or use 🎤..."
            disabled={loading}
            className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-xl ${
              isRecording ? "bg-red-600" : "bg-gray-600"
            } text-white`}>
            🎤
          </button>
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
