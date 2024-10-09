import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { initNuiFrame } from "@lib/preact-shared/main";
import { VisibilityProvider } from "@lib/preact-shared/providers/VisibilityProvider";

import { Router } from "./Router";

initNuiFrame("player-menu");

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <VisibilityProvider>
        <Router />
      </VisibilityProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
