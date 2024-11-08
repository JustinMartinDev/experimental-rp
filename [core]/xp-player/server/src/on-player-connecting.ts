import { prisma } from "@lib/database";

type SetKickReasonFn = (reason: string) => void;

type Deferrals = {
  done: () => void;
};

const handlePlayerConnecting = async (
  name: string,
  setKickReason: SetKickReasonFn,
  deferrals: Deferrals,
) => {
  // @ts-ignore
  declare const source: string;
  const steamId = GetPlayerIdentifierByType(source, "steam");

  const player = await prisma.player.findUnique({
    where: {
      steamId,
    },
  });

  if (!player) {
    setKickReason("You are not registered in the database.");
    CancelEvent();
    return;
  }

  deferrals.done();
};

on("playerConnecting", handlePlayerConnecting);
