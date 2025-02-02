import { onClientEvent } from "@lib/citizenfx-utils/event/server";

const resourceName = GetCurrentResourceName();

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`  ${resourceName}:${name}`);
  onClientEvent(`${resourceName}:${name}`, fn);
};

const initClientEvents = () => {
  console.log("Registering client event :");
};

export { initClientEvents };
