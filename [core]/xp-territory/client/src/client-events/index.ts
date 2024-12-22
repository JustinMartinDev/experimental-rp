import { onEvent } from "@lib/citizenfx-utils/event/server";
import { config as openMenuConfig } from "./open-menu";

const resourceName = GetCurrentResourceName();

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`  ${resourceName}:${name}`);
  onEvent(`${resourceName}:${name}`, fn);
};

const initClientEvents = () => {
  console.log("Registering client event :");

  registerClientEvent(openMenuConfig.name, openMenuConfig.fn);
};

export { initClientEvents };
