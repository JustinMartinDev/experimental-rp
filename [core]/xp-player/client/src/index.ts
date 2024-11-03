import { onStart, triggerServerEvent } from "@lib/citizenfx-utils/event/client";

onStart(() => {});

RegisterCommand(
  "xp-player:get-me",
  async () => {
    console.log("player:get-me command called");

    const player = await triggerServerEvent({
      event: "player:get-me",
      params: {},
    });

    console.log("player me", player);
  },
  false,
);
