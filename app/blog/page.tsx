import prisma from "@/lib/prisma/client";

export default function Page({
  params: { category },
}: {
  params: { category: string };
}) {
  return <h1>Welcome to Blog</h1>;
}
