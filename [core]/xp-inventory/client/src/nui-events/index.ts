import { config as getMyInventoryConfig } from "./get-my-inventory";
import { config as hideFrameConfig } from "./hide-frame";
import { config as useItemConfig } from "./use-item";

const registerCallback = (name: string, fn: Function) => {
  console.log(`xp-inventory:${name}`);
  RegisterNuiCallback(`xp-inventory:${name}`, fn);
};

const initNuiEvents = () => {
  console.group("Registering nui callback :");
  // dynamic require "config" from all file except index.ts
  // for each call registerNuiCallback with config.name and config.fn and false as restricted
  registerCallback(getMyInventoryConfig.name, getMyInventoryConfig.fn);
  registerCallback(hideFrameConfig.name, hideFrameConfig.fn);
  registerCallback(useItemConfig.name, useItemConfig.fn);

  console.groupEnd();
};

export { initNuiEvents };
