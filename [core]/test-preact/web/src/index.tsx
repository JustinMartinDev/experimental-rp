import { render } from "preact";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initNuiFrame } from "@lib/preact-shared/main";

import "./style.css";
import { Router } from "./router";

initNuiFrame("player-menu");

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("app"));
