import { triggerServerEventPromise } from "@lib/event/client";

const result = await triggerServerEventPromise({
  event: "myEvent",
  params: { name: "John" },
});

console.log(result); // { name: "John" }