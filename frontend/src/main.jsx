import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { WebsocketProvider } from './components/webs.jsx';

const rootElement = document.querySelector("#root");

if (rootElement) {
  createRoot(rootElement).render(
  <StrictMode>
    <WebsocketProvider>
      <App />
    </WebsocketProvider>
  </StrictMode>,
  )
} else {
  console.error("No root element found!");
}
