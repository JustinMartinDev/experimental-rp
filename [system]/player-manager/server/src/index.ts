import { prisma } from "@lib/database";
import { onClientEvent, triggerClientEvent } from "@lib/citizenfx-utils/event/server";
import { getInfoForSpawn } from "./command/getInfoForSpawn";
import { saveLocation } from "./command/saveLocation";

type SetKickReasonFn = (reason: string) => void;

type Deferrals = {
  done: () => void;
}

const IDENTIFIER_STEAM_ID = 0;

on(
  "playerConnecting",
  async (name: string, setKickReason: SetKickReasonFn, deferrals: Deferrals) => {
    // @ts-ignore
    declare const source: string;

    const steamId = GetPlayerIdentifierByType(source, "steam");

    const player = await prisma.player.findUnique({
      where: {
        steamId,
      },
    });

    if(!player) {
      setKickReason("You are not registered in the database.");
      CancelEvent();
      return;
    }

    deferrals.done();

    console.log("Player connected", source);

    await triggerClientEvent({
      event: "player:force-spawn",
      source: source,
      params: {  
        playerId: player.id,
      }
    });
  }
);

type GetInfoForSpawnParams = { playerId: number };

onClientEvent("player:get-info-for-spawn", async ({ playerId }: GetInfoForSpawnParams) => {
  console.log("launched command", "player:get-info-for-spawn", playerId);

  const spawnInfo = await getInfoForSpawn(playerId);

  return spawnInfo;
});

type SaveLocationParams = { source: string; location: { x: number; y: number; z: number; } };

onClientEvent("player:save-location", async ({ source, location }: SaveLocationParams) => {
  console.log("launched command", "player:save-location", source, location);

  await saveLocation(source, location);
});