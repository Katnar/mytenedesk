import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ThemeWrapper from "./Theme/ThemeWrapper.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </React.StrictMode>
);
