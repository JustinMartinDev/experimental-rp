import { config as spawnPedsConfig } from "./spawn-peds";

const resource = GetCurrentResourceName();

const registerCommand = (name: string, fn: Function) => {
  console.log(`  ${resource}:${name}`);

  RegisterCommand(`${resource}:${name}`, fn, false);
};

const initCommands = () => {
  console.log("Registering commands :");

  registerCommand(spawnPedsConfig.name, spawnPedsConfig.fn);
};

export { initCommands };
