import { config as displayConfig } from "./display";
import { config as interactWithAreaConfig } from "./interact-with-area";

const resource = GetCurrentResourceName();

const registerCommand = (name: string, fn: Function) => {
  console.log(`  ${resource}:${name}`);

  RegisterCommand(`${resource}:${name}`, fn, false);
};

const initCommands = () => {
  console.log("Registering commands :");
  // dynamic require "config" from all file except index.ts
  // for each call RegisterCommand with config.name and config.fn and false as restricted
  registerCommand(displayConfig.name, displayConfig.fn);

  registerCommand(interactWithAreaConfig.name, interactWithAreaConfig.fn);

  RegisterKeyMapping(
    `${resource}:${interactWithAreaConfig.name}`,
    "Inteact with ped",
    "keyboard",
    "f",
  );
};

export { initCommands };
