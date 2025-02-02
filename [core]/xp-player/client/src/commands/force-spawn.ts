import { forceSpawnCharacter } from "./force-spawn/spawn-character";

type ForceSpawnCmdParams = [string] | [string, string];

const forceSpawnCmd = async (source: number, args: ForceSpawnCmdParams) => {
  const dbPlayerId = parseInt(args[0]);
  const characterId = args[1] ? parseInt(args[1]) : undefined;

  await forceSpawnCharacter(dbPlayerId, characterId);
};

export const config = {
  name: "force-spawn",
  fn: forceSpawnCmd,
};
