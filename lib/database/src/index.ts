import { PrismaClient, Prisma } from "../prisma/generated";

const prisma = new PrismaClient();

export { prisma, Prisma };
