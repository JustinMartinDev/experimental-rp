import { Prisma } from "@lib/database";

const pedWithLocation = Prisma.validator<Prisma.PedDefaultArgs>()({
  include: { location: true },
});

export type PedWithLocation = Prisma.PedGetPayload<typeof pedWithLocation>;

const location = Prisma.validator<Prisma.LocationDefaultArgs>()({});

export type Location = Prisma.LocationGetPayload<typeof location>;
