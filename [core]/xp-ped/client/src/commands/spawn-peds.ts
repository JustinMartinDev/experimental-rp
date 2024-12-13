import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { loadModel } from "@lib/citizenfx-utils/model/loadModel";

import { GetPedsReturn } from "@xp-ped/types/server/client-event/get-peds";
import { PedWithLocation } from "@xp-ped/types/prisma";

const spawnPed = async (pedInfo: PedWithLocation) => {
  const { name, location, model } = pedInfo;

  console.log("model", model);

  // Load model
  await loadModel(model);

  // Create the ped at specified coordinates
  const ped = CreatePed(
    4,
    model,
    location.x,
    location.y,
    location.z - 0.5,
    0,
    false,
    true,
  );

  // Freeze the ped in place
  FreezeEntityPosition(ped, true);

  // Make the ped invincible
  SetEntityInvincible(ped, true);

  // Disable ped's AI
  TaskSetBlockingOfNonTemporaryEvents(ped, true);
  SetPedFleeAttributes(ped, 0, false);
  SetPedCombatAttributes(ped, 46, true);
};

export const spawnPeds = async () => {
  // Get crimi peds
  const { peds } = await triggerServerEvent<GetPedsReturn>({
    event: "xp-ped:get-peds",
  });

  // Spawn crimi peds
  await Promise.all(peds.map(spawnPed));
};

export const config = {
  name: "spawn-peds",
  fn: spawnPeds,
};
