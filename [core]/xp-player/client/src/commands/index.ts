import { config as getMyPlayerConfig } from "./get-my-player";
import { config as forceSpawnConfig } from "./force-spawn";
import { config as saveLocationConfig } from "./save-location";

const resource = GetCurrentResourceName();

const registerCommand = (name: string, fn: Function) => {
  console.log(`  ${resource}:${name}`);

  RegisterCommand(`${resource}:${name}`, fn, false);
};

const initCommands = () => {
  console.log("Registering commands :");
  // dynamic require "config" from all file except index.ts
  // for each call RegisterCommand with config.name and config.fn and false as restricted
  registerCommand(getMyPlayerConfig.name, getMyPlayerConfig.fn);
  registerCommand(forceSpawnConfig.name, forceSpawnConfig.fn);
  registerCommand(saveLocationConfig.name, saveLocationConfig.fn);
};

export { initCommands };
