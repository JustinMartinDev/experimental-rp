import { onClientEvent } from "@lib/citizenfx-utils/event/server";

import { config as getPedsConfig } from "./get-peds";

const resourceName = GetCurrentResourceName();

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`  ${resourceName}:${name}`);
  onClientEvent(`${resourceName}:${name}`, fn);
};

const initClientEvents = () => {
  console.log("Registering client event :");

  registerClientEvent(getPedsConfig.name, getPedsConfig.fn);
};

export { initClientEvents };
