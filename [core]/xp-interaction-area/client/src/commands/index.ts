import { config as initInteractionAreasConfig } from "./init-interaction-areas";

const resource = GetCurrentResourceName();

const registerCommand = (name: string, fn: Function) => {
  console.log(`  ${resource}:${name}`);

  RegisterCommand(`${resource}:${name}`, fn, false);
};

const initCommands = () => {
  console.log("Registering commands :");
  // dynamic require "config" from all file except index.ts
  // for each call RegisterCommand with config.name and config.fn and false as restricted
  registerCommand(
    initInteractionAreasConfig.name,
    initInteractionAreasConfig.fn,
  );
};

export { initCommands };
