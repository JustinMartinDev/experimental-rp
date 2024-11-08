import { onStart } from "@lib/citizenfx-utils/event/client";
import { initClientEvents } from "./client-events";

onStart(() => {
  initClientEvents();
});
