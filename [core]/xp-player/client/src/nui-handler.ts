import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { initNuiHandler as initUseItemNuiHandler } from "./use-item";
import { registerNUICallback, toggleNuiFrame } from "@lib/nui/utils";

export const initNuiHandler = () => {
  registerNUICallback("get-my-characters", async (_data, cb) => {
    const inventory = await triggerServerEvent({
      event: "inventory:get-my-inventory"
    })

    cb(inventory);
  });

  initUseItemNuiHandler();
};
