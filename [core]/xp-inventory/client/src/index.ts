import { onStart } from "@lib/citizenfx-utils/event/client";

import { initCommands } from "./commands";
import { initNuiEvents } from "./nui-events";
import { initClientEvents } from "./client-events";
import { initServerEvents } from "./server-events";

onStart(() => {
  initCommands();
  initNuiEvents();
  initClientEvents();
  initServerEvents();
});
