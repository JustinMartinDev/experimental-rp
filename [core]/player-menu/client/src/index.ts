import { onStart } from "@lib/event/client";
import { toggleNuiFrame, sendReactMessage } from "@lib/nui/utils";
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
    sendReactMessage("setView", {
      viewId: "home",
    });
  },
  false
);

RegisterCommand("+i-pressed", () => {
  console.log("I key was just released");
}, false);

RegisterKeyMapping('+i-pressed', 'Open Inventory', 'keyboard', 'i')

const onKeyDown = () => {
  const I_KEY_CODE = 23;
  const ESC_KEY_CODE = 322;

  if(IsControlJustReleased(0, I_KEY_CODE)) {
    console.log("I key pressed");
  }
  
  // Close NUI if ESC is pressed
  if(IsNuiFocused() && IsControlJustReleased(0, ESC_KEY_CODE)) {
    sendReactMessage("setView", {
      viewId: "home",
    });
    toggleNuiFrame(false);
  }

  // Open NUI if I is pressed
  if(!IsNuiFocused() && IsControlJustReleased(0, I_KEY_CODE)) {
    toggleNuiFrame(true);
    sendReactMessage("setView", {
      viewId: "home",
    });
  }
}

setTick(onKeyDown)