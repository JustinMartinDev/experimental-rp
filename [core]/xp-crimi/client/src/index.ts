import { onStart } from "@lib/citizenfx-utils/event/client";
import { wait } from "@lib/citizenfx-utils/waitFor";

import { spawnCrimiPeds } from "./spawn-crimi-peds";

onStart(async () => {
  await wait(1000);

  await spawnCrimiPeds();
});