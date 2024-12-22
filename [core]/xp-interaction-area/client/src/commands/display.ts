import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { InteractionAreaWithLocation } from "@xp-interaction-area/types/prisma";
import { GetInteractionAreasReturn } from "@xp-interaction-area/types/server/get-interaction-areas";

const drawInteractionAreas = (interactionArea: InteractionAreaWithLocation) => {
  //@ts-ignore
  DrawMarker(
    23,
    interactionArea.location.x,
    interactionArea.location.y,
    interactionArea.location.z,
    0,
    0,
    0,
    0,
    0,
    0,
    interactionArea.radius * 2,
    interactionArea.radius * 2,
    0.5001,
    169,
    169,
    169,
    200,
    false,
    0,
    0,
    0,
  );
};

const display = async () => {
  const { interactionAreas } =
    await triggerServerEvent<GetInteractionAreasReturn>({
      event: "xp-interaction-area:get-interaction-areas",
      params: {},
    });

  setTick(() => {
    for (const interactionArea of interactionAreas) {
      drawInteractionAreas(interactionArea);
    }

    Wait(150);
  });
};

export const config = {
  name: "display",
  fn: display,
};
