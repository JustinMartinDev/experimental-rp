import {
  triggerClientEvent,
  triggerServerEvent,
} from "@lib/citizenfx-utils/event/client";
import { InteractionAreaWithLocation } from "@xp-interaction-area/types/prisma";
import { GetInteractionAreasReturn } from "@xp-interaction-area/types/server/get-interaction-areas";

const isPlayerInInteractionArea = (
  interactionArea: InteractionAreaWithLocation,
) => {
  const playerPed = PlayerPedId();
  const playerCoords = GetEntityCoords(playerPed, true);

  const distance = Vdist(
    playerCoords[0],
    playerCoords[1],
    playerCoords[2],
    interactionArea.location.x,
    interactionArea.location.y,
    interactionArea.location.z,
  );

  return distance / 2 < interactionArea.radius;
};

const interactWithArea = async () => {
  const { interactionAreas } =
    await triggerServerEvent<GetInteractionAreasReturn>({
      event: "xp-interaction-area:get-interaction-areas",
      params: {},
    });

  const areaToInteract = interactionAreas.find(isPlayerInInteractionArea);

  if (!areaToInteract) {
    return;
  }

  triggerClientEvent({
    event: areaToInteract.eventId,
    params: JSON.parse(areaToInteract.eventParams),
  });
};

export const config = {
  name: "interact-with-area",
  fn: interactWithArea,
};
