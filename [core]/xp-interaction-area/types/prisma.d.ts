import { Prisma } from "@lib/database";

const interactionAreaWithLocation =
  Prisma.validator<Prisma.InteractionAreaDefaultArgs>()({
    include: {
      location: true,
    },
  });

export type InteractionAreaWithLocation = Prisma.InteractionAreaGetPayload<
  typeof interactionAreaWithLocation
>;
