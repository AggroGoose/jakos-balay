import type { Client } from "@notionhq/client";
import type { PrismaClient } from "@prisma/client";

declare global {
  var gnotion: Client;
  var prismat: PrismaClient;
}
