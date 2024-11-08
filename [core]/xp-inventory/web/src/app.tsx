import { useEffect } from "preact/hooks";

import { initNuiFrame } from "@lib/preact-shared/main";

import { Router } from "./router";
import { fetchNui } from "@lib/preact-shared/utils/fetchNui";

export function App() {
  useEffect(() => {
    initNuiFrame(window, "xp-inventory");
  }, []);

  return <Router />;
}
