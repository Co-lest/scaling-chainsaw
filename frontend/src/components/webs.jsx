  const [messages, setMessages] = useState<string>([]);
  const[inputMessage, setInputMessage] = useState("");
  const [connectionStatus, setConnectiobnStatus] = useState(`Disconnected`);
  const wsRef = useRef<WebSocket | null>(null);

  const connectWebsocket = useCallback(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const hostname = window.location.hostname;
    const wsUrl = `${protocol}//${hostname}:3333`;

    const ws =  new WebSocket(wsUrl);

    ws.onopen = () => {
      setConnectiobnStatus("Connected");
      console.log(`Connected to ws server!`)
    }

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, `received: ${event.data}`]);
      console.log(event.data);
    } 

    ws.onclose = () => {
      setConnectiobnStatus("Disconnected");
      console.log("Disconnected rfom ws server!");
      setTimeout(connectWebsocket, 3000);
    }

    ws.onerror = (error) => {
      console.error(`Ws error!`, error);
      setConnectiobnStatus(`Error connecting`);
    }

    wsRef.current = ws;
  }, []);

  useEffect(() => {
    connectWebsocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    }
  }, [connectWebsocket]);

  const sendMessage = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && inputMessage) {
      wsRef.current.send(JSON.stringify(inputMessage));
      setMessages((prev) => [...prev, `Sent: ${inputMessage}`]);
      setInputMessage("");
    }
  }, [inputMessage])