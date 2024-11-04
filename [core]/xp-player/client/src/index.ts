import { onStart, triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { initCommands } from "./commands";
import { forceSpawnCharacter } from "./commands/force-spawn/spawn-character";
import { wait } from "@lib/citizenfx-utils/waitFor";
import { initNuiEvents } from "./nui-events";

onStart(() => {
  initCommands();
  initNuiEvents();
});

/** Detect the game start to spawn the player character */
let startGameDetectThread: number | null = null;

const startGame = async () => {
  clearTick(startGameDetectThread!);

  const playerPed = PlayerPedId();

  if (playerPed && playerPed !== -1 && NetworkIsPlayerActive(PlayerId())) {
    const { playerId: dbPlayerId } = await triggerServerEvent<{
      playerId: number;
    }>({ event: "xp-player:get-xp-player-id" });

    await forceSpawnCharacter(dbPlayerId);
  }
};

startGameDetectThread = setTick(async () => {
  await wait(50); // Wait for 50 ms

  if (NetworkIsSessionStarted()) {
    await startGame();
  }
});

