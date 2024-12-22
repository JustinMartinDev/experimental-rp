import { Prisma } from "@lib/database";

const territoryWithOrganization =
  Prisma.validator<Prisma.TerritoryDefaultArgs>()({
    include: {
      organization: true,
    },
  });

export type TerritoryWithOrganization = Prisma.TerritoryGetPayload<
  typeof territoryWithOrganization
>;

const territory = Prisma.validator<Prisma.TerritoryDefaultArgs>()({});

export type Territory = Prisma.TerritoryGetPayload<typeof territory>;
