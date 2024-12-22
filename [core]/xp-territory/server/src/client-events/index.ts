import { onClientEvent } from "@lib/citizenfx-utils/event/server";

import { config as getTerritoriesConfig } from "./get-territories";
import { config as getTerritoryConfig } from "./get-territory";

const resourceName = GetCurrentResourceName();

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`  ${resourceName}:${name}`);
  onClientEvent(`${resourceName}:${name}`, fn);
};

const initClientEvents = () => {
  console.log("Registering client event :");

  registerClientEvent(getTerritoriesConfig.name, getTerritoriesConfig.fn);
  registerClientEvent(getTerritoryConfig.name, getTerritoryConfig.fn);
};

export { initClientEvents };
