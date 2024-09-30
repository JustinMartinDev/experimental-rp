import { onStart, triggerServerEvent } from "@lib/event/client";

onStart(() => {});

RegisterCommand(
  "player:get-me",
  async () => {
    console.log("player:get-me command called");

    const player = await triggerServerEvent({
      event: "player:get-me",
      params: {},
    });

    console.log("player me", player);
  },
  false
);
