import { config as getStoreDataConfig } from "./get-store-data";
import { onEvent } from "@lib/citizenfx-utils/event/server";

const resource = GetCurrentResourceName();

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`  ${resource}:${name}`);
  // Register client event
  onEvent(`${resource}:${name}`, fn);
};

const initClientEvents = () => {
  console.log("Registering client :");

  registerClientEvent(getStoreDataConfig.name, getStoreDataConfig.fn);
};

export { initClientEvents };
