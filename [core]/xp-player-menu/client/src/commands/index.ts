import { config as openMenuConfig } from "./open-menu";

const resourceName = GetCurrentResourceName();

const registerCommand = (name: string, fn: Function) => {
  console.log(  `${resourceName}:${name}`);
  RegisterCommand(`${resourceName}:${name}`, fn, false);
};

const initCommands = () => {
  console.log("Registering commands :");
  // dynamic require "config" from all file except index.ts
  // for each call RegisterCommand with config.name and config.fn and false as restricted
  registerCommand(openMenuConfig.name, openMenuConfig.fn);

  RegisterKeyMapping(`${resourceName}:${openMenuConfig.name}`, "Open Inventory", "keyboard", "i");  
};

export { initCommands };
