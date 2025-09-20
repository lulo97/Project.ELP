import { createContext, useContext, useState, useCallback } from "react";

const MessageContext = createContext();

const HORIZONTAL_AMOUNT = 20;
const VERTICAL_AMOUNT = 20;

const positionMap = {
  "top-left": { top: VERTICAL_AMOUNT, left: HORIZONTAL_AMOUNT },
  "top-right": { top: VERTICAL_AMOUNT, right: HORIZONTAL_AMOUNT },
  "bottom-left": { bottom: VERTICAL_AMOUNT, left: HORIZONTAL_AMOUNT },
  "bottom-right": { bottom: VERTICAL_AMOUNT, right: HORIZONTAL_AMOUNT },
  "top-center": {
    top: VERTICAL_AMOUNT,
    left: "50%",
    transform: "translateX(-50%)",
  },
  "bottom-center": {
    bottom: VERTICAL_AMOUNT,
    left: "50%",
    transform: "translateX(-50%)",
  },
};

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const fireMessage = useCallback(
    ({ type = "success", text, duration = 3000, position = "bottom-right" }) => {
      const id = Date.now() + Math.random();
      const pos = positionMap[position] || positionMap["bottom-right"];

      const newMessage = { id, type, text, position: pos, visible: false };
      setMessages((prev) => [...prev, newMessage]);

      // Trigger fade-in
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, visible: true } : msg))
        );
      }, 10); // slight delay to trigger CSS transition

      // Trigger fade-out after duration
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, visible: false } : msg))
        );
      }, duration - 300); // start fade-out slightly before removal

      // Remove after fade-out
      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }, duration);
    },
    []
  );

  return (
    <MessageContext.Provider value={{ fireMessage }}>
      {children}
      {messages.map((message) => {
        let style = message.position;

        return (
          <div
            key={message.id}
            className={`fixed z-50 px-4 py-2 rounded shadow-md transform transition-all duration-300 ease-out
              ${message.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
              ${
                {
                  success: "bg-green-500 text-white",
                  error: "bg-red-500 text-white",
                  info: "bg-blue-500 text-white",
                  warning: "bg-yellow-400 text-black",
                }[message.type] || "bg-gray-500 text-white"
              }
            `}
            style={style}
          >
            {message.text}
          </div>
        );
      })}
    </MessageContext.Provider>
  );
}

export const useMessage = () => useContext(MessageContext);
