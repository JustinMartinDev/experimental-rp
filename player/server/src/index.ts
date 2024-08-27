import { init } from "./init";
import { prisma } from "database"

on("onResourceStart", async (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    init();
  }
});


onNet("player:get-players:request", async (cb: Function) => {
  const players = await prisma.player.findMany();

  emitNet("player:get-players:response", JSON.stringify(players))
});