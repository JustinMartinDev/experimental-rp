import { onStart } from "@lib/citizenfx-utils/event/client";
import { wait } from "@lib/citizenfx-utils/waitFor";

import { spawnCrimiPeds } from "./spawn-crimi-peds";
import { initCommands } from "./commands";

onStart(async () => {
  initCommands();

  await wait(1000);

  await spawnCrimiPeds();
});