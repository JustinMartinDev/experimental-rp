import { config as initTerritoriesConfig } from "./init-territories";
import { config as getCoordsConfig } from "./get-coords";

const resource = GetCurrentResourceName();

const registerCommand = (name: string, fn: Function) => {
  console.log(`  ${resource}:${name}`);

  RegisterCommand(`${resource}:${name}`, fn, false);
};

const initCommands = () => {
  console.log("Registering commands :");
  // dynamic require "config" from all file except index.ts
  // for each call RegisterCommand with config.name and config.fn and false as restricted
  registerCommand(initTerritoriesConfig.name, initTerritoriesConfig.fn);
  registerCommand(getCoordsConfig.name, getCoordsConfig.fn);
};

export { initCommands };
("[{'x': 80.33020782470703, 'y': 22.095542907714844, 'z': 69.06058502197266}, {'x': 55.79349136352539, 'y': 32.7109260559082, 'z': 70.3888931274414}, {'x': 51.141502380371094, 'y': 18.78508949279785, 'z': 69.68862915039062}, {'x': 74.5478286743164, 'y': 8.262575149536133, 'z': 68.7522964477539}]");
