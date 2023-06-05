import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prismat) {
    global.prismat = new PrismaClient();
  }
  prisma = global.prismat;
}

export default prisma;
