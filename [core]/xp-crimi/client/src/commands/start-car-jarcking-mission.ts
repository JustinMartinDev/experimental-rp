import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";

const CARJACKABLE_VEHICLES = [
  //{ name: "granger", hash: 2519238556 },
  { name: "asterope", hash: -1903012613 },
];

const dismantlingVehicleZone = {
  x: -328.55859375,
  y: -136.5591278076172,
  z: 39.009674072265625,
  radius: 5,
};

const findAndGoToVehicle = async (hash: number) => {
  const vehicleEntities = GetGamePool("CVehicle") as number[];

  const vehicleFounded = vehicleEntities.find((vehicle) => {
    const model = GetEntityModel(vehicle);

    if (model === hash) {
      return true;
    }
  });

  const [x, y, z] = GetEntityCoords(vehicleFounded!, false);

  SetEntityCoords(PlayerPedId(), x, y, z, false, false, false, true);
};

const isInVehiculeHash = (vehicleModelHash: number) => {
  const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);

  if (vehicle === 0) {
    return false;
  }

  const model = GetEntityModel(vehicle);

  if (model !== vehicleModelHash) {
    return false;
  }

  return true;
};

const startCarJackingMission = async () => {
  // Pick random element in CARJACKABLE_VEHICLES
  const vehicleToFind =
    CARJACKABLE_VEHICLES[
      Math.floor(Math.random() * CARJACKABLE_VEHICLES.length)
    ];

  console.log(
    "Starting car jacking mission with vehicle: ",
    vehicleToFind.name,
  );

  const [x, y, z] = GetEntityCoords(PlayerPedId(), false);

  console.log("Coords: ", x, y, z);

  const detectionId = setTick(() => {
    if (!isInVehiculeHash(vehicleToFind.hash)) return;

    console.log("Congrats you found the vehicle!");
    console.log("Go to your garage to dismantling it!");

    
    // Spawn marker in dismantling zone

    // When leave vehicle in zone and it's the right vehicle

    // Third eye when look at the vehicle, show dismantling button
    // When pressed, set random animation in list [soudeur, marteau, scie]

    // Each vehicle has 5 parts to dismantle
    // Each part takes 10 seconds to dismantle
    // Each part give random number (between 1 and 3) of (motor parts, carroserie part, electric part)

    // At each part dismantled, increse the vehicle damage

    // When all parts dismantled, and all player outside of the garage, delete the vehicle

    clearTick(detectionId);
  });
};

export const config = {
  name: "start-car-jacking-mission",
  fn: startCarJackingMission,
};
