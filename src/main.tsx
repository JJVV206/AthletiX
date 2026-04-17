import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { AppStateProvider } from "@/context/app-state-context";
import { SessionProvider } from "@/context/session-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SessionProvider>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </SessionProvider>
  </React.StrictMode>,
);
