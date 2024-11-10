import { NUICallbackFunction } from "@lib/citizenfx-utils/nui";
import XpPlayerStore from "../store";
import { forceSpawnCharacter } from "../commands/force-spawn/spawn-character";

type SetActiveCharacterData = {
  characterId: number;
};

const setActiveCharacter: NUICallbackFunction<SetActiveCharacterData> = async (
  { characterId },
  cb,
) => {
  console.log(
    `Setting active character to ${characterId}`,
    XpPlayerStore.activeDbPlayerId,
  );

  await forceSpawnCharacter(XpPlayerStore.activeDbPlayerId!, characterId);

  cb({ characterId: XpPlayerStore.activeDbCharacterId });
};

export const config = {
  name: "set-active-character",
  fn: setActiveCharacter,
};
