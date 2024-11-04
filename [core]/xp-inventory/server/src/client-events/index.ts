import { onClientEvent } from "@lib/citizenfx-utils/event/server";

import { config as getItemConfig } from "./get-item";
import { config as getItemsConfig } from "./get-items";
import { config as getMyInventoryConfig } from "./get-my-inventory";

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`xp-inventory:${name}`);
  onClientEvent(`xp-inventory:${name}`, fn);
};

const initClientEvents = () => {
  console.group("Registering client event :");
  // dynamic require "config" from all file except index.ts
  // for each call registerClientEvent with config.name and config.fn
  registerClientEvent(getItemConfig.name, getItemConfig.fn);
  registerClientEvent(getItemsConfig.name, getItemsConfig.fn);
  registerClientEvent(getMyInventoryConfig.name, getMyInventoryConfig.fn);

  console.groupEnd();
};

export { initClientEvents };
