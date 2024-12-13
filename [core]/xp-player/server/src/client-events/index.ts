import { onClientEvent } from "@lib/citizenfx-utils/event/server";

import { config as getCharacterSpawnInfoConfig } from "./get-character-spawn-info";
import { config as getMyPlayer } from "./get-my-player";
import { config as saveLocationConfig } from "./save-location";
import { config as getCharactersConfig } from "./get-characters";
import { config as getDefaultCharacterSpawnInfoConfig } from "./get-default-character-spawn-info";

const resourceName = GetCurrentResourceName();

const registerClientEvent = (name: string, fn: Function) => {
  console.log(`  ${resourceName}:${name}`);
  onClientEvent(`${resourceName}:${name}`, fn);
};

const initClientEvents = () => {
  console.log("Registering client event :");

  registerClientEvent(
    getCharacterSpawnInfoConfig.name,
    getCharacterSpawnInfoConfig.fn,
  );
  registerClientEvent(saveLocationConfig.name, saveLocationConfig.fn);
  registerClientEvent(getMyPlayer.name, getMyPlayer.fn);
  registerClientEvent(getCharactersConfig.name, getCharactersConfig.fn);
  registerClientEvent(
    getDefaultCharacterSpawnInfoConfig.name,
    getDefaultCharacterSpawnInfoConfig.fn,
  );
};

export { initClientEvents };
