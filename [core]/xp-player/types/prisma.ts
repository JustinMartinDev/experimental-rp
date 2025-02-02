import { Prisma } from "@lib/database";

// 1: Define a type that includes the relation to `Post`
const character = Prisma.validator<Prisma.CharacterDefaultArgs>()({});

export type Character = Prisma.CharacterGetPayload<typeof character>;

const player = Prisma.validator<Prisma.PlayerDefaultArgs>()({});

export type Player = Prisma.PlayerGetPayload<typeof player>;
