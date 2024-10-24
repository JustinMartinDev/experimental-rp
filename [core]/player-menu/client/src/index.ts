import { onStart } from "@lib/citizenfx-utils/event/client";
import { toggleNuiFrame, sendReactMessage } from "@lib/nui/utils";
import { initNuiHandler } from "./nui-handler";

onStart(() => {
  initNuiHandler();
  toggleNuiFrame(false);
});

const openMenu = () => {
  toggleNuiFrame(true);
  sendReactMessage("set-view", {
    viewId: "home",
  });
}

const closeMenu = () => {
  toggleNuiFrame(false);
}

RegisterCommand(
  "player-menu:open",
  openMenu,
  false
);

RegisterCommand(
  "player-menu:close",
  closeMenu,
  false
);

RegisterCommand("+i-pressed", () => {
  openMenu();
}, false);

RegisterKeyMapping('+i-pressed', 'Open Inventory', 'keyboard', 'i')