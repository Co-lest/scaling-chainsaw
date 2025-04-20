import { createContext, useContext, useEffect, useRef, useState } from "react";

// Create the WebSocket context
const WebSocketContext = createContext(null);

// WebSocket provider component
export const WebsocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState(null);
  const [userdata, setUserdata] = useState(null);

  const ws = useRef(null);

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const port = 3333; // Replace with process.env.PORT if using env variables
  const wsUrl = `${protocol}//localhost:${port}`;

  useEffect(() => {
    ws.current = new WebSocket(wsUrl);
    console.log("Connecting to WebSocket:", wsUrl);

    ws.current.onopen = () => {
      console.log("WebSocket connected!");
      setIsConnected(true);
    };

    // When a message is received
    ws.current.onmessage = (event) => {
      const dataReceived = JSON.parse(event.data);
      console.log("Message received:", dataReceived);

      // Dynamically update userdata depending on what the message contains
      if (dataReceived?.logbool !== undefined) {
        setUserdata(dataReceived.logbool);
      } else if (dataReceived?.content !== undefined) {
        setUserdata(dataReceived.content);
      }
      setMessage(dataReceived);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected.");
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = (msg) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(msg));
    } else {
      console.error("WebSocket is not connected. Cannot send message.");
    }
  };

  return (
    <WebSocketContext.Provider value={{ message, userdata, sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
