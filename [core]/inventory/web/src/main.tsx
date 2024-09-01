import React from "react";
import ReactDOM from "react-dom/client";
import { VisibilityProvider } from "./providers/VisibilityProvider";
import App from "./App";
import "./index.css";
import { isEnvBrowser } from "./utils/misc";
import {
  mockTriggerNuiEvent,
  mockTriggerNuiEvents,
} from "./utils/mockTriggerNuiEvent";

declare global {
  interface Window {
    invokeNative?: unknown;
    GetParentResourceName: () => string;
    citFrames: Record<string, HTMLIFrameElement>;
    mockTriggerNuiEvents: typeof mockTriggerNuiEvents;
    mockTriggerNuiEvent: typeof mockTriggerNuiEvent;
  }
}

parent["GetParentResourceName"] = () => "forum-drive-spawner-ts-nui-react"


if (import.meta.env.MODE === "development" && isEnvBrowser()) {
  window.mockTriggerNuiEvent = mockTriggerNuiEvent;
  window.mockTriggerNuiEvents = mockTriggerNuiEvents;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <VisibilityProvider>
      <App />
    </VisibilityProvider>
  </React.StrictMode>
);
