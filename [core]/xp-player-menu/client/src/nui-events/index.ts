import { config as hideFrameConfig } from "./hide-frame";
import {
  NUICallbackFunction,
  registerNUICallback,
} from "@lib/citizenfx-utils/nui";

const resourceName = GetCurrentResourceName();

const registerNui = (name: string, fn: NUICallbackFunction<any>) => {
  console.log(`${resourceName}:${name}`);
  registerNUICallback(`${resourceName}:${name}`, fn);
};

const initNuiEvents = () => {
  console.group("Registering nui events :");
  // dynamic require "config" from all file except index.ts
  // for each call registerNUICallback with config.name and config.fn
  registerNui(hideFrameConfig.name, hideFrameConfig.fn);

  console.groupEnd();
};

export { initNuiEvents };
