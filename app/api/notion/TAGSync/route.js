import { NextResponse } from "next/server";
import notion from "@/lib/notion/notion";
import prisma from "@/lib/prisma/client";

const db = process.env.NOTION_DB;

export async function GET() {
  const res = await notion.databases.retrieve({
    database_id: db,
  });

  const { Category, Tags } = res.properties;
  const SubCategory = res.properties["Sub-Category"];
  console.log(Tags.multi_select);

  const categoryArray = Category?.select?.options || [];
  const subCategoryArray = SubCategory?.select?.options || [];
  const tagArray = Tags?.multi_select?.options || [];

  console.log("--TAG UPDATES--");

  for (const tag of tagArray) {
    await prisma.tag
      .upsert({
        where: {
          id: tag.id,
        },
        update: {
          title: tag.name,
        },
        create: {
          id: tag.id,
          title: tag.name,
        },
      })
      .then(console.log(tag.name + " Updated"))
      .catch((error) => console.error(error));
  }

  console.log("--CATEGORY UPDATES--");

  for (const category of categoryArray) {
    await prisma.category
      .upsert({
        where: {
          id: category.id,
        },
        update: {
          title: category.name,
        },
        create: {
          id: category.id,
          title: category.name,
        },
      })
      .then(console.log(category.name + " Updated"))
      .catch((error) => console.error(error));
  }

  console.log("--CATEGORY UPDATES--");

  for (const subCategory of subCategoryArray) {
    await prisma.subCategory
      .upsert({
        where: {
          id: subCategory.id,
        },
        update: {
          title: subCategory.name,
        },
        create: {
          id: subCategory.id,
          title: subCategory.name,
        },
      })
      .then(console.log(subCategory.name + " Updated"))
      .catch((error) => console.error(error));
  }

  const updata = { categoryArray, subCategoryArray, tagArray };

  return NextResponse.json({ updata });
}
