import { onStart } from "@lib/citizenfx-utils/event/client";
import { toggleNuiFrame } from "@lib/citizenfx-utils/nui";

import { initCommands } from "./commands";
import { initNuiEvents } from "./nui-events";

onStart(() => {
  initCommands();
  initNuiEvents();

  toggleNuiFrame(false);
});
