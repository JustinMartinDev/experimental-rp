import { Prisma } from "@lib/database";

const pedWithOrganizationAndLocation = Prisma.validator<Prisma.PedDefaultArgs>()({
  include: { organization: true, location: true },
});

export type PedWithOrganizationAndLocation = Prisma.PedGetPayload<
  typeof pedWithOrganizationAndLocation
>;

const location = Prisma.validator<Prisma.LocationDefaultArgs>()({});

export type Location = Prisma.LocationGetPayload<typeof location>;