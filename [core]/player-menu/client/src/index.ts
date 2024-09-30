import { onStart } from "@lib/event/client";
import { toggleNuiFrame } from "@lib/nui/utils";
import { initNuiHandler } from "./nui-handler";

onStart(() => {
  initNuiHandler();
});

RegisterCommand(
  "player-menu:close",
  () => {
    toggleNuiFrame(false);
  },
  false
);

RegisterCommand(
  "player-menu:open",
  async () => {
    toggleNuiFrame(true);
  },
  false
);
