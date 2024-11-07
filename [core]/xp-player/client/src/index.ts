import { onStart, triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { wait } from "@lib/citizenfx-utils/waitFor";

import { GetMyPlayerReturn } from "@xp-player/types/server/get-my-player";

import { initCommands } from "./commands";
import { initNuiEvents } from "./nui-events";
import { initClientEvents } from "./client-events";

import { forceSpawnCharacter } from "./commands/force-spawn/spawn-character";

onStart(() => {
  initCommands();
  initClientEvents();
  initNuiEvents();
});

/** Detect the game start to spawn the player character */
let startGameDetectThread: number | null = null;

const startGame = async () => {
  clearTick(startGameDetectThread!);

  const playerPed = PlayerPedId();

  if (playerPed && playerPed !== -1 && NetworkIsPlayerActive(PlayerId())) {
    const { player } = await triggerServerEvent<GetMyPlayerReturn>({
      event: "xp-player:get-my-player",
    });

    await forceSpawnCharacter(player.id);
  }
};

startGameDetectThread = setTick(async () => {
  await wait(50); // Wait for 50 ms

  if (NetworkIsSessionStarted()) {
    await startGame();
  }
});
