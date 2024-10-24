import { onStart } from "@lib/citizenfx-utils/event/server";
import { initClientEventHandlers } from "./client-event-handler";

onStart(() => {
  initClientEventHandlers();
});
