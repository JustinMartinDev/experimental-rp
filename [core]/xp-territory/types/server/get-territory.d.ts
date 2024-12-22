import { Territory } from "../prisma";

export type GetTerritoryParam = {
  territoryId: number;
};

export type GetTerritoryReturn = {
  territory: Territory;
};
