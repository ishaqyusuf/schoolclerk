import { Prisma as BasePrisma, db } from "@gnd/db";

export const prisma = db;
export const Prisma = BasePrisma;
export * from "@gnd/db";
