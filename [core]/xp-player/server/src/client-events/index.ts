import { onClientEvent } from "@lib/citizenfx-utils/event/server";

import { config as getInfoForSpawnConfig } from "./get-info-for-spawn";
import { config as getMyPlayer } from "./get-my-player";
import { config as saveLocationConfig } from "./save-location";

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`xp-player:${name}`);
  onClientEvent(`xp-player:${name}`, fn);
};

const initClientEvents = () => {
  console.group("Registering client event :");
  // dynamic require "config" from all file except index.ts
  // for each call registerClientEvent with config.name and config.fn
  registerClientEvent(getInfoForSpawnConfig.name, getInfoForSpawnConfig.fn);
  registerClientEvent(saveLocationConfig.name, saveLocationConfig.fn);
  registerClientEvent(getMyPlayer.name, getMyPlayer.fn);
 
  console.groupEnd();
};

export { initClientEvents };
