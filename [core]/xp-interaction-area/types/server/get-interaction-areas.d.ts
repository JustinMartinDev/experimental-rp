import { interactionAreaWithLocation } from "../prisma";

export type GetInteractionAreasParam = {};

export type GetInteractionAreasReturn = {
  interactionAreas: interactionAreaWithLocation[];
};
