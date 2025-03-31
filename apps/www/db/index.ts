import { db } from "@gnd/db";

export { type Prisma } from "@prisma/client";

export const prisma = db;
// export const Prisma = BasePrisma;

export * from "@gnd/db";
