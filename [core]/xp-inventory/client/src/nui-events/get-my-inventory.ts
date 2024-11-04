import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { NUICallbackFunction } from "@lib/citizenfx-utils/nui";

const getMyInventory: NUICallbackFunction<unknown> = async (_data, cb) => {
  const inventory = await triggerServerEvent({
    event: "inventory:get-my-inventory",
  });

  cb(inventory);
};

export const config = {
  name: "get-my-inventory",
  fn: getMyInventory,
};
