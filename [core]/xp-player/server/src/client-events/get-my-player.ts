import { prisma } from "@lib/database";

import { GetMyPlayerParam, GetMyPlayerReturn } from "@xp-player/types/server/get-my-player";

export const getMyPlayer = async ({ source }: GetMyPlayerParam) => {
  const steamId = GetPlayerIdentifier(`${source}`, 0);

  const player = await prisma.player.findUnique({
    where: {
      steamId,
    },
  });

  return { player } as  GetMyPlayerReturn;
};

export const config = {
  name: "get-my-player",
  fn: getMyPlayer,
};
