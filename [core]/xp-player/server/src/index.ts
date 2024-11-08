import { onStart } from "@lib/citizenfx-utils/event/server";
import { initClientEvents } from "./client-events";

onStart(() => {
  initClientEvents();
});

import "./on-player-connecting";
