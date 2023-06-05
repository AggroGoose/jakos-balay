import { NextResponse } from "next/server";
import notion from "@/lib/notion/notion";
import prisma from "@/lib/prisma/client";

const db = process.env.NOTION_DB;

export async function GET() {
  const page = await notion.databases.query({
    database_id: db,
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
  });

  const { results } = page;
  const result1 = results[0];

  for (const result of results) {
    const { Slug, Category, Summary, Title, Tags } = result.properties;
    const SubCategory = result.properties["Sub-Category"];
    const DatePublished = result.properties["Date Published"];
    const DateEdited = result.properties["Date Edited"];
    const FeatureImage = result.properties["Feature Image"];
    const tagArray = Tags.multi_select;

    const tagUpd = [];

    for (const tag of tagArray) {
      const tagObj = {
        tag: {
          connect: {
            id: tag.id,
          },
        },
      };

      tagUpd.push(tagObj);
    }

    let updObj = {
      title: Title.title[0].plain_text,
      slug: Slug.rich_text[0].plain_text,
      category: Category.select.id,
      subCategory: SubCategory.select.id,
      featureImg: FeatureImage.files[0].file.url || "",
      summary: Summary.rich_text[0].plain_text || "",
      datePublished: DatePublished.date.start,
      dateEdited: DateEdited.date.start,
    };
    await prisma.post
      .upsert({
        where: {
          id: result.id,
        },
        update: {},
        create: {
          id: result.id,
          title: updObj.title,
          slug: updObj.slug,
          summary: updObj.summary,
          featureImg: updObj.featureImg,
          tags: {
            create: tagUpd,
          },
          category: {
            connect: {
              id: updObj.category,
            },
          },
          subCategory: {
            connect: {
              id: updObj.subCategory,
            },
          },
        },
      })
      .then(console.log(updObj.title + " Updated"))
      .catch((error) => console.error(error));
  }

  return NextResponse.json(result1);
}
