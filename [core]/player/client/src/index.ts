on("onResourceStart", (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("player client started!");
  }
});

RegisterCommand("get-players", () => {
  console.log("get-players command called");
  emitNet("player:get-players:request");
}

on("player:get-players:response", (players: any) => {
  console.log("players", players)
})