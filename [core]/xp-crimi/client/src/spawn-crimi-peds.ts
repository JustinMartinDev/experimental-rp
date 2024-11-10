import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { loadModel } from "@lib/citizenfx-utils/model/loadModel";

import { GetCrimiPedsReturn } from "@xp-crimi/types/server/client-event/get-crimi-peds";
import {
  Location,
  PedWithOrganizationAndLocation,
} from "@xp-crimi/types/prisma";

const spawnPed = async (pedInfo: PedWithOrganizationAndLocation) => {
  const { name, location, model } = pedInfo;

  // Load model
  await loadModel(model);

  // Create the ped at specified coordinates
  const ped = CreatePed(
    4,
    model,
    location.x,
    location.y,
    location.z,
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

  console.log(
    "Spawn ped",
    name,
    "at",
    location.x,
    location.y,
    location.z,
    "with model",
    model,
  );
};

export const spawnCrimiPeds = async () => {
  // Get crimi peds
  const { peds } = await triggerServerEvent<GetCrimiPedsReturn>({
    event: "xp-crimi:get-crimi-peds",
  });

  // Spawn crimi peds
  await Promise.all(peds.map(spawnPed));
};
