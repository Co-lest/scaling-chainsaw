import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const rootElement = document.querySelector("#root");

if (rootElement) {
  createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
  )
} else {
  console.error("No root element found!");
}
