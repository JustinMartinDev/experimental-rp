import { triggerServerEvent } from "@lib/event/client"

on("onResourceStart", (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("player client started!");
  }
});

RegisterCommand("player:get-me", async () => {
  console.log("player:get-me command called");

  const player = await triggerServerEvent({
    event: "player:get-me",
    params: {}
  })

  console.log("player me", player)
}, false);