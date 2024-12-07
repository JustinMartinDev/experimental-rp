import { InteractionAreaWithLocation } from "../prisma";

export type GetInteractionAreasParam = {};

export type GetInteractionAreasReturn = {
  interactionAreas: InteractionAreaWithLocation[];
};
