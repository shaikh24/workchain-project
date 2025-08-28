import { useState } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Client", text: "Hello, I need a website design", time: "10:30 AM" },
    { id: 2, sender: "You", text: "Sure! Can you share your requirements?", time: "10:32 AM" },
    { id: 3, sender: "Client", text: "Yes, I’ll send a document.", time: "10:35 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto h-[80vh] bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 font-semibold text-lg">
        Messages 💬
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs shadow ${
                msg.sender === "You"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs opacity-70 block mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t flex space-x-2 bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
