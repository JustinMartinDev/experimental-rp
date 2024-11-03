import {
  onStart,
  triggerServerEvent,
  onServerEvent,
} from "@lib/citizenfx-utils/event/client";
import { forceSpawnCmd } from "./commands/force-spawn";
import { saveLocationCmd } from "./commands/save-location";
import { wait } from "@lib/citizenfx-utils/waitFor";
import { initNuiHandler } from "./nui-handler";

onStart(async () => {
  //const {playerId: xpPlayerId} = await triggerServerEvent<{playerId: number}>({ event: "player:get-xp-player-id" });
});

RegisterCommand("player:force-spawn", forceSpawnCmd, false);

RegisterCommand("player:save-location", saveLocationCmd, false);

type ForceSpawnEventParams = {
  playerId: string;
};

let startGameDetectThread: number | null = null;

const startGame = async () => {
  clearTick(startGameDetectThread!);

  const playerPed = PlayerPedId();

  if (playerPed && playerPed !== -1 && NetworkIsPlayerActive(PlayerId())) {
    const { playerId: dbPlayerId } = await triggerServerEvent<{
      playerId: number;
    }>({ event: "player:get-xp-player-id" });

    await forceSpawnCmd(PlayerId(), [dbPlayerId.toString()]);
  }
};

startGameDetectThread = setTick(async () => {
  await wait(50); // Wait for 50 ms

  if (NetworkIsSessionStarted()) {
    await startGame();
  }
});

initNuiHandler();
