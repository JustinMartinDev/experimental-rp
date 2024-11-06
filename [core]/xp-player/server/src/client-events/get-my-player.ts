import { prisma } from "@lib/database";

export type GetMyPlayerParams = {
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

export type GetMyPlayerReturn = ReturnType<typeof getMyPlayer>;

export const config = {
  name: "get-my-player",
  fn: getMyPlayer,
};
