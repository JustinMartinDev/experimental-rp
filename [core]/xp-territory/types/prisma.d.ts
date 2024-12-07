import { Prisma } from "@lib/database";

const territoryWthOrganization =
  Prisma.validator<Prisma.TerritoryDefaultArgs>()({
    include: {
      organization: true,
    },
  });

export type TerritoryWithOrganization = Prisma.TerritoryGetPayload<
  typeof territoryWthOrganization
>;
