import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";

const getVehiculeModel = async () => {
  const playerPed = PlayerPedId(); // Get player's ped (character)
  const vehicle = GetVehiclePedIsIn(playerPed, false); // Get vehicle player is in

  if (vehicle === 0) {
    console.log("No vehicle");
    return;
  }

  const model = GetEntityModel(vehicle);
  const modelName = GetDisplayNameFromVehicleModel(model);

  console.log(`Vehicle model`, modelName, model);
};

export const config = {
  name: "get-vehicle-model",
  fn: getVehiculeModel,
};
