import { useEffect, useRef } from 'react';

function useWebSocket(url = 'ws://localhost:3333') {
  const websocket = useRef(null);

  useEffect(() => {
    websocket.current = new WebSocket(url);

    websocket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    websocket.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('Received:', message);
        // Handle received data here (e.g., update state, call a function)
        // Example:
        // handleReceivedData(message);
      } catch (error) {
        console.error('Error parsing message:', error);
        console.log('Raw Message:', event.data); //log the raw message for debugging.
      }
    };

    websocket.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    websocket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, [url]);

  const sendMessage = (message) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket not connected or not open.');
    }
  };

  return sendMessage; // Return only the sendMessage function.
}

// Example usage in a functional component:

function MyComponent() {
  const sendMessage = useWebSocket(); //uses the default url of ws://localhost:3333, or pass in a url.

  const handleButtonClick = () => {
    sendMessage({ type: 'chat', text: 'Hello from React!' });
  };

  useEffect(() => {
    // any other side effects
  }, []);

  return (
    <div>
      <button onClick={handleButtonClick}>Send Message</button>
      {/* No return component */}
    </div>
  );
}

export default MyComponent;