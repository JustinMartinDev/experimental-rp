import { config as getMyInventoryConfig } from "./get-my-inventory";
import { config as hideFrameConfig } from "./hide-frame";
import { config as useItemConfig } from "./use-item";

import {
  NUICallbackFunction,
  registerNUICallback,
} from "@lib/citizenfx-utils/nui";

const resourceName = GetCurrentResourceName();

const registerNui = (name: string, fn: NUICallbackFunction<any>) => {
  console.log(`  ${resourceName}:${name}`);
  registerNUICallback(name, fn);
};

const initNuiEvents = () => {
  console.log("Registering nui callback :");

  registerNui(getMyInventoryConfig.name, getMyInventoryConfig.fn);
  registerNui(hideFrameConfig.name, hideFrameConfig.fn);
  registerNui(useItemConfig.name, useItemConfig.fn);
};

export { initNuiEvents };
