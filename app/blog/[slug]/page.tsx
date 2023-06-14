import { BlogBlock } from "@/lib/blog";
import prisma from "@/lib/prisma/client";
import type { Post } from "@prisma/client";
import Image from "next/image";

interface PostContent extends Post {
  content: BlogBlock[];
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();

  return posts.map((post) => {
    slug: post.slug;
  });
}

export default async function BlogPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const response = await fetch("http://localhost:3000/api/posts/" + slug, {
    next: { revalidate: 20 },
  });

  const post = (await response.json()) as PostContent;

  console.log(post);
  return (
    <>
      <Image
        src={post?.featureImg || ""}
        priority={true}
        height={400}
        width={800}
        alt=""
      />
      <h1>Welcome to the {post.title} Jungle!</h1>
    </>
  );
}
