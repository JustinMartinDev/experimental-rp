import { prisma } from "@lib/database";

type GetMyPlayerParams = {
  source: number;
};

export const getMyPlayer = async ({ source }: GetMyPlayerParams) => {
  const steamId = GetPlayerIdentifier(`${source}`, 0);

  const player = await prisma.player.findUnique({
    where: {
      steamId,
    },
  });

  return player;
};

export const config = {
  name: "get-my-player",
  fn: getMyPlayer,
};
