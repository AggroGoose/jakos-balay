import ContentBuilder from "@/components/contentBuilder";
import { BlogBlock } from "@/lib/blog";
import prisma from "@/lib/prisma/client";
import type { Post } from "@prisma/client";
import BlogHead from "./header/blogHead";

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

  return (
    <main>
      <BlogHead
        title={post.title}
        subCategoryName={post.subCategoryName}
        datePublished={post.datePublished}
        summary={post.summary}
        featureImg={post.featureImg}
      />
      <ContentBuilder
        className="blog-content primary-grid"
        content={post.content}
      />
    </main>
  );
}
