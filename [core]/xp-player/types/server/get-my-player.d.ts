import { Player } from "../prisma";

export type GetMyPlayerParam = {
  source: number;
};

export type GetMyPlayerReturn = {
  player: Player;
};
