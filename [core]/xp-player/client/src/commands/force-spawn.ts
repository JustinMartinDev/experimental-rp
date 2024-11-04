import { forceSpawnCharacter } from "./force-spawn/spawn-character";

type ForceSpawnCmdParams = [string] | [string, string];

const forceSpawnCmd = async (source: number, args: ForceSpawnCmdParams) => {
  const dbPlayerId = parseInt(args[0]);
  const characterId = args[1] ? parseInt(args[1]) : undefined;

  console.log("player:force-spawn command called", dbPlayerId, characterId);

  await forceSpawnCharacter(dbPlayerId, characterId);
};

export const config = {
  name: "xp-player:force-spawn",
  fn: forceSpawnCmd,
};
