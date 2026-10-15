import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";

import "./index.css";
import App from "./App.tsx";
// eslint-disable-next-line
// @ts-ignore
const domRoot = createRoot(document.getElementById('root'));
domRoot.render(<StrictMode>
  <ThemeProvider attribute="class">
    <App />
  </ThemeProvider>
</StrictMode>);
