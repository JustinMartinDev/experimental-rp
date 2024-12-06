import { onStart } from "@lib/citizenfx-utils/event/client";

import { initCommands } from "./commands";

onStart(() => {
  initCommands();
});
