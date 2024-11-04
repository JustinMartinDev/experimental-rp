import { NUICallbackFunction } from "@lib/citizenfx-utils/nui";
import XpPlayerStore from "../store";

const getMyActiveCharacterId: NUICallbackFunction<unknown> = async (
  _data,
  cb,
) => {
  cb({ characterId: XpPlayerStore.activeDbCharacterId });
};

export const config = {
  name: "get-my-active-character-id",
  fn: getMyActiveCharacterId,
};
