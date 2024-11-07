import { useEffect } from "preact/hooks";

import { initNuiFrame } from "@lib/preact-shared/main";

import { Router } from "./router";
import { fetchNui } from "@lib/preact-shared/utils/fetchNui";

export function App() {
  useEffect(() => {
    initNuiFrame(window, "xp-player-menu");

    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "i") {
        await fetchNui("hide-frame");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return <Router />;
}
