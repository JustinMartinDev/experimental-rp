import { onStart } from "@lib/citizenfx-utils/event/client";

import { initCommands } from "./commands";
import { initClientEvents } from "./client-events";

onStart(() => {
  initCommands();
  initClientEvents();
});
