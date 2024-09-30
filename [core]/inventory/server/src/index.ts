import { onStart } from "@lib/event/client";
import { initClientEventHandlers } from "./client-event-handler";

onStart(() => {
  initClientEventHandlers();
});
