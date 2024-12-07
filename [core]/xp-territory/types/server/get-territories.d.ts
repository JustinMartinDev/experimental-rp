import { TerritoryWithOrganization } from "../prisma";

export type GetTerritoriesParam = {};

export type GetTerritoriesReturn = {
  territories: TerritoryWithOrganization[];
};
