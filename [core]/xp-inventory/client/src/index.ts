import { onStart } from "@lib/citizenfx-utils/event/client";
import { triggerClientEvent } from "@lib/citizenfx-utils/event/client";

import { initNuiEvents } from "./nui-events";

onStart(() => {
  initNuiEvents();
});

const testFetchXpPlayerStore = async () => {
  const data = await triggerClientEvent(
    {
      event: "xp-player:get-store-data",
      params: {
        property: "activeDbPlayerId"
      }
    }
  );

  console.log(data);
}

RegisterCommand("test-player-store", testFetchXpPlayerStore, false);