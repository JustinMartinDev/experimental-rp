import { onStart } from "@lib/event/server";
import { initClientEventHandlers } from "./client-event-handler";

onStart(() => {
  initClientEventHandlers();
});
