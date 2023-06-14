import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/client";
import { serverPromise } from "@/lib/mongoDb/config";

export async function GET() {
  const page = await prisma.post.findUnique({
    where: { id: "13b06007-d153-4ba4-a1e8-835a3c52049b" },
  });

  const client = await serverPromise.catch((error) =>
    console.log("error on connect", error)
  );

  const db = client.db("jako");
  const collection = db.collection("posts");

  const content = await collection.findOne({
    id: "13b06007-d153-4ba4-a1e8-835a3c52049b",
  });

  return NextResponse.json({ page, content });
}
