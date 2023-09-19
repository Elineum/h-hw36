import React from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "./redux/StoreProvider";
import { App } from "./App";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
