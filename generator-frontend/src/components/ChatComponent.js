import { React, useState, useEffect, useRef} from "react";
import Button from "react-bootstrap/Button";
import { TiMessageTyping } from "react-icons/ti";

//TODO: Implement stream response
const ChatComponent = ({ setIsChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track if bot is typing
  const chatContainerRef = useRef(null); // Ref for the chat container


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setIsLoading(true);
    try {
        const response = await fetch(`http://localhost:8080/queryAIOptions?prompt=${encodeURIComponent(input)}`);
      
        // Check if the response is OK
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        // Parse the response from the backend
        const data = await response.text(); // Assuming the API returns plain text
        console.log(data);
  
        // Add bot message immediately after receiving response
        const botMessage = { sender: "bot", text: data };
        setMessages((prevMessages) => [...prevMessages, botMessage]); 
        setIsLoading(false); // Stop loading when the response is received
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }

    setInput(""); // Clear input field
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <div className="mb-2 fixed bottom-20 right-6 w-96 h-99 bg-white border border-gray-300 shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">AI Chat</h2>
        <button className="text-red-500" onClick={() => setIsChatOpen(false)}>
          ✕
        </button>
      </div>
      <div ref={chatContainerRef} className="h-60 overflow-y-auto border p-2 rounded flex flex-col">
        {messages.length === 0 ? (
          <p className="text-gray-500">Ask me anything...</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded ${
                msg.sender === "user"
                  ? "bg-blue-200 self-start max-w-60"
                  : "bg-gray-200 self-end max-w-60"
              }`}
            >
              <strong>{msg.sender === "user" ? "You:" : ""}</strong> {msg.text}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-end items-center mt-2">
            <TiMessageTyping size={24} />
          </div>
        )}
      </div>
      <input
        className="p-2 mt-2 border rounded w-full"
        type="text"
        value={input}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <Button className="mt-2" onClick={sendMessage} variant="secondary" disabled={isLoading} >
        Send
      </Button>
    </div>
  );
};

export default ChatComponent;
