import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const MessageContext = createContext(null);

const positionMap = {
  "top-left": "top-5 left-5",
  "top-right": "top-5 right-5",
  "bottom-left": "bottom-5 left-5",
  "bottom-right": "bottom-5 right-5",
  "top-center": "top-5 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-5 left-1/2 -translate-x-1/2",
};

// Store global fire function
let globalFire = null;

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const message = useCallback(
    ({
      type = "success",
      text,
      duration = 3000,
      position = "bottom-right",
    }) => {
      const id = Date.now() + Math.random();
      const pos = positionMap[position] || positionMap["bottom-right"];

      const newMessage = { id, type, text, position: pos, visible: false };
      setMessages((prev) => [...prev, newMessage]);

      // Fade in
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, visible: true } : msg))
        );
      }, 10);

      // Fade out
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, visible: false } : msg))
        );
      }, duration - 300);

      // Remove
      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }, duration);
    },
    []
  );

  // Register the global function once
  useEffect(() => {
    globalFire = message;
    return () => {
      globalFire = null;
    };
  }, [message]);

  return (
    <MessageContext.Provider value={{ message }}>
      {children}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`fixed z-50 ${message.position} pointer-events-none`}
          aria-live="polite"
        >
          <div
            className={`shadow-lg px-4 py-2 rounded transform transition-all duration-300 ease-out pointer-events-auto
              ${
                message.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }
              ${
                {
                  success: "bg-green-500 text-white",
                  error: "bg-red-500 text-white",
                  info: "bg-blue-500 text-white",
                  warning: "bg-yellow-400 text-black",
                }[message.type] || "bg-gray-500 text-white"
              }
            `}
          >
            {message.text}
          </div>
        </div>
      ))}
    </MessageContext.Provider>
  );
}

export const message = (
  options = {
    type: "success",
    text: "Empty message!",
    duration: 3000,
    position: "bottom-right",
  }
) => {
  if (options.type == 'error') {
    console.error(options.text);
  }
  if (globalFire) globalFire(options);
  else console.warn("⚠️ MessageProvider not mounted yet!");
};
