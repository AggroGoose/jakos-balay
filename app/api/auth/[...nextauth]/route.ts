import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

const googleID = process.env.GOOGLE_CLIENT || "";
const googleSecret = process.env.GOOGLE_SECRET || "";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: true,
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_SERVER_USER,
          serviceClient: process.env.EMAIL_SERVER_CLIENT,
          privateKey: process.env.EMAIL_SERVER_PRIVATE_KEY,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: googleID,
      clientSecret: googleSecret,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
