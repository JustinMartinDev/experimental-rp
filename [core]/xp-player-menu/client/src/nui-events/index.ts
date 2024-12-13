import { config as hideFrameConfig } from "./hide-frame";
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
  console.log("Registering nui events :");
  registerNui(hideFrameConfig.name, hideFrameConfig.fn);
};

export { initNuiEvents };
