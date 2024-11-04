import { config as getMyCharacter } from "./get-my-characters";
import { config as getMyActiveCharacterId } from "./get-my-active-character-id";
import { config as setActiveCharacter } from "./set-active-character";
import {
  NUICallbackFunction,
  registerNUICallback,
} from "@lib/citizenfx-utils/nui";

const resourceName = GetCurrentResourceName();

const registerNui = (name: string, fn: NUICallbackFunction<any>) => {
  console.log(`${resourceName}:${name}`);
  registerNUICallback(`${resourceName}:${name}`, fn);
};

const initNuiEvents = () => {
  console.group("Registering nui events :");
  // dynamic require "config" from all file except index.ts
  // for each call registerNUICallback with config.name and config.fn
  registerNui(getMyCharacter.name, getMyCharacter.fn);
  registerNui(getMyActiveCharacterId.name, getMyActiveCharacterId.fn);
  registerNui(setActiveCharacter.name, setActiveCharacter.fn);

  console.groupEnd();
};

export { initNuiEvents };
