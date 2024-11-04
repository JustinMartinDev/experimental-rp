import { config as getMyPlayerConfig } from "./get-my-player";
import { config as forceSpawnConfig } from "./force-spawn";
import { config as saveLocationConfig } from "./save-location";

const registerCommand = (name: string, fn: Function) => {
  console.log(`xp-player:${name}`);
  RegisterCommand(`xp-player:${name}`, fn, false);
};

const initCommands = () => {
  console.group("Registering commands :");
  // dynamic require "config" from all file except index.ts
  // for each call RegisterCommand with config.name and config.fn and false as restricted
  registerCommand(getMyPlayerConfig.name, getMyPlayerConfig.fn);
  registerCommand(forceSpawnConfig.name, forceSpawnConfig.fn);
  registerCommand(saveLocationConfig.name, saveLocationConfig.fn);

  console.groupEnd();
};

export { initCommands };
