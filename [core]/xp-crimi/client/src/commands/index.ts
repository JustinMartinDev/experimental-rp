import { config as startCarJackingMissionConfig } from "./start-car-jarcking-mission";
import { config as getVehicleModelConfig } from "./get-vehicle-model";

const resource = GetCurrentResourceName();

const registerCommand = (name: string, fn: Function) => {
  console.log(`  ${resource}:${name}`);

  RegisterCommand(`${resource}:${name}`, fn, false);
};

const initCommands = () => {
  console.log("Registering commands :", "by crimi", "nad dev", "and try");

  registerCommand(
    startCarJackingMissionConfig.name,
    startCarJackingMissionConfig.fn,
  );
  registerCommand(getVehicleModelConfig.name, getVehicleModelConfig.fn);
};

export { initCommands };
