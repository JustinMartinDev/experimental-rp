import { onStart, triggerServerEvent, onServerEvent } from "@lib/citizenfx-utils/event/client";
import { forceSpawnCmd } from "./commands/force-spawn";
import { saveLocationCmd } from "./commands/save-location";

onStart(() => {});

RegisterCommand(
  "player:force-spawn",
  forceSpawnCmd,
  false
);

RegisterCommand(
  "player:save-location",
  saveLocationCmd,
  false
);

type ForceSpawnEventParams = {
  playerId: string;
}

onServerEvent("player:force-spawn", async ({ playerId }: ForceSpawnEventParams) => {
  await forceSpawnCmd(PlayerId(), [playerId]);
});