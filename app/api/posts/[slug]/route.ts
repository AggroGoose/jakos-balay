import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/client";
import { serverPromise } from "@/lib/mongoDb/config";
import type { Post } from "@prisma/client";
import { BlogBlock } from "@/lib/blog";

type DataResponse = {
  id: string;
  content: Array<BlogBlock>;
};

interface PostContent extends Post {
  content: BlogBlock[];
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  console.log(slug);

  const page = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      tags: true,
    },
  });

  const client = await serverPromise.catch((error) =>
    console.log("error on connect", error)
  );

  if (!client || !page) return NextResponse.error();

  const db = client.db("jako");
  const collection = db.collection("posts");

  const content = (await collection.findOne({
    id: page.id,
  })) as unknown as DataResponse;

  const finalObj: PostContent = { ...page, content: content.content };

  return NextResponse.json(finalObj);
}
