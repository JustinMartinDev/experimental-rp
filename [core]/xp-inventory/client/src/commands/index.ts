import { config as openInventoryConfig } from "./open-inventory";

const registerCommand = (name: string, fn: Function) => {
  console.log(`xp-inventory:${name}`);
  RegisterCommand(`xp-inventory:${name}`, fn, false);
};

const initCommands = () => {
  console.group("Registering commands :");
  // dynamic require "config" from all file except index.ts
  // for each call RegisterCommand with config.name and config.fn and false as restricted

  registerCommand(openInventoryConfig.name, openInventoryConfig.fn);
  console.groupEnd();
};

export { initCommands };
