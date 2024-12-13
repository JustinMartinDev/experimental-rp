import { PedWithLocation } from "../../prisma";

export type GetPedsReturn = {
  peds: PedWithLocation[];
};
