import { onServerEvent } from "@lib/citizenfx-utils/event/client";
import { onClientEvent } from "@lib/citizenfx-utils/event/server";

const registerServerEvent = (name: string, fn: Function) => {
  console.log(`xp-inventory:${name}`);
  onServerEvent(`xp-inventory:${name}`, fn);
};

const initServerEvents = () => {
  console.group("Registering server event :");
  // dynamic require "config" from all file except index.ts
  // for each call registerServerEvent with config.name and config.fn

  console.groupEnd();
};

export { initServerEvents };
