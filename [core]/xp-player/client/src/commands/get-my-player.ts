import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";

const getMyPlayer = async () => {
  const player = await triggerServerEvent({
    event: "xp-player:get-my-player",
    params: {},
  });

  console.log("my player", player);
};

export const config = {
  name: "get-my-player",
  fn: getMyPlayer,
};
