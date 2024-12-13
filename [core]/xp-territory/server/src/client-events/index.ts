import { onClientEvent } from "@lib/citizenfx-utils/event/server";

import { config as getInteractionAreasConfig } from "./get-territories";

const resourceName = GetCurrentResourceName();

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`  ${resourceName}:${name}`);
  onClientEvent(`${resourceName}:${name}`, fn);
};

const initClientEvents = () => {
  console.log("Registering client event :");

  registerClientEvent(
    getInteractionAreasConfig.name,
    getInteractionAreasConfig.fn,
  );
};

export { initClientEvents };
