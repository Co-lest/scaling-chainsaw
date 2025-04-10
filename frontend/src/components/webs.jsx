import { createContext, useContext, useEffect, useRef, useState } from "react";
const WebSocketContext = createContext(null);

export const WebsocketProvider = ({children}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState(null);

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const port = 3333;

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`${protocol}//localhost:${port}`);

    ws.current.onopen = () => {
      console.log(`WS connected!`);
      setIsConnected(true);
    }

    ws.current.onmessage = (data) => {
      setMessage(JSON.parse(data.data));  // log - { logbool: {data} } , sign - {type: "sign", content:data or false } 
      console.log(message);
    }

    ws.current.onclose = () => {
      console.log(`WS disconnected!`);
      setIsConnected(false);
    }

    ws.current.onerror = (error) => {
      console.error(`Error loading connecting the ws: ${error}`);
      isConnected(false);
    }

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close(); // disconnects when the component unmounts
      }
    }
  }, []);

  const sendMessage = (msg) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(msg));
    } else {
      console.error('WebSocket connection is not open.');
    }
  };

  return (
    <WebSocketContext.Provider value={{ message, sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
