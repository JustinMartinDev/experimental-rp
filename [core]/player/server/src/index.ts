import { prisma } from "database"

prisma.player.findMany().then(
  (players: any) => { console.log("players", players) }
)
/*
on("onResourceStart", async (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    init();
    const players = await prisma.player.findMany();
    console.log("players", JSON.stringify(players))
  }
});

onNet("player:get-players:request", async (cb: Function) => {
  const players = await prisma.player.findMany();

  emitNet("player:get-players:response", JSON.stringify(players))
});*/