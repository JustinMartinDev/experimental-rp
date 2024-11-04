import { onClientEvent } from "@lib/citizenfx-utils/event/server";

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`xp-inventory:${name}`);
  onClientEvent(`xp-inventory:${name}`, fn);
};

const initClientEvents = () => {
  console.group("Registering client event :");
  // dynamic require "config" from all file except index.ts
  // for each call registerClientEvent with config.name and config.fn

  console.groupEnd();
};

export { initClientEvents };
