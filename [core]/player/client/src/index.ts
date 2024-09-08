import { triggerServerEvent } from "@lib/event/client"

on("onResourceStart", (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("player client started!");
  }
});

RegisterCommand("get-players", async () => {
  console.log("get-players command called");

  const players = await triggerServerEvent({
    event: "player:get-players",
    params: {}
  })

  console.log("players", players)
}, false);