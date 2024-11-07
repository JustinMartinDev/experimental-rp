import { onClientEvent } from "@lib/citizenfx-utils/event/server";

import { config as getItemConfig } from "./get-item";
import { config as getItemsConfig } from "./get-items";
import { config as getCharacterInventoryConfig } from "./get-character-inventory";

const resourceName = GetCurrentResourceName();

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`  ${resourceName}:${name}`);
  onClientEvent(`${resourceName}:${name}`, fn);
};

const initClientEvents = () => {
  console.log("Registering client event :");
  // dynamic require "config" from all file except index.ts
  // for each call registerClientEvent with config.name and config.fn
  registerClientEvent(getItemConfig.name, getItemConfig.fn);
  registerClientEvent(getItemsConfig.name, getItemsConfig.fn);
  registerClientEvent(getCharacterInventoryConfig.name, getCharacterInventoryConfig.fn);

  
};

export { initClientEvents };
