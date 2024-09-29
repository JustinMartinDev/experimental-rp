import React from "react";
import ReactDOM from "react-dom/client";
import { VisibilityProvider } from "./providers/VisibilityProvider";
import "./index.css";
import { isEnvBrowser } from "./utils/misc";
import {
  mockTriggerNuiEvent,
  mockTriggerNuiEvents,
} from "./utils/mockTriggerNuiEvent";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "./router";

declare global {
  interface Window {
    invokeNative?: unknown;
    GetParentResourceName: () => string;
    citFrames: Record<string, HTMLIFrameElement>;
    mockTriggerNuiEvents: typeof mockTriggerNuiEvents;
    mockTriggerNuiEvent: typeof mockTriggerNuiEvent;
  }
}

parent["GetParentResourceName"] = () => "item";

if (import.meta.env.MODE === "development" && isEnvBrowser()) {
  window.mockTriggerNuiEvent = mockTriggerNuiEvent;
  window.mockTriggerNuiEvents = mockTriggerNuiEvents;
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <VisibilityProvider>
        <RouterProvider />
      </VisibilityProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
