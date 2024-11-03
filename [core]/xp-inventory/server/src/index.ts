import { onStart } from "@lib/citizenfx-utils/event/client";
import { initClientEventHandlers } from "./client-event-handler";

onStart(() => {
  initClientEventHandlers();
});
