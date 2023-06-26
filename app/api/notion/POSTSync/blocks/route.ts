import { NextResponse } from "next/server";
import notion from "@/lib/notion/notion";
import { serverPromise } from "@/lib/mongoDb/config";
import {
  BlogBlock,
  ResultObject,
  DbResults,
  RichTextArr,
  EmbedObject,
  UnparsedListItem,
  ListObject,
} from "@/lib/blog";
import ParseText from "./RTParse";
import { ListParse } from "./listParse";
import prisma from "@/lib/prisma/client";

export async function GET() {
  const pages = await prisma.post.findMany();
  pages.forEach(async (page) => {
    const id = page.id;
    const result = (await notion.blocks.children.list({
      block_id: id,
      page_size: 70,
    })) as DbResults;

    const blocks = result.results;
    const ImgArr: Array<{ index: number; url: string }> = [];
    const TitleArr: Array<{ index: number; title: string }> = [];
    const ChildArr: Array<{ index: number; id: string }> = [];
    const OlArr: Array<UnparsedListItem> = [];
    const UlArr: Array<UnparsedListItem> = [];
    const BlockArr: Array<BlogBlock> = [];

    blocks.forEach((block: ResultObject, i: number) => {
      const blockObj: BlogBlock = {
        id: i,
        parentId: "test",
        type: null,
        content: null,
      };
      if (block["bulleted_list_item"]) {
        console.log("UL Item Pushed at index: " + i);
        UlArr.push({
          type: "unordered",
          index: i,
          content: ParseText(block["bulleted_list_item"].rich_text),
        });
      }
      if (block["callout"]) {
        const content = ParseText(block["callout"].rich_text);
        blockObj.type = "callout";
        blockObj.content = content;
      }
      if (block["embed"]) {
        const content: EmbedObject = {
          url: block["embed"].url,
          caption: ParseText(block["embed"].caption),
          type: "twitter",
        };
        blockObj.type = "embed";
        blockObj.content = content;
      }
      if (block["heading_1"]) {
        const title = block["heading_1"].rich_text[0].plain_text;
        blockObj.type = "h1";
        blockObj.content = { content: title };
        TitleArr.push({ index: i, title });
      }
      if (block["heading_2"]) {
        const title = block["heading_2"].rich_text[0].plain_text;
        blockObj.type = "h2";
        blockObj.content = { content: title };
      }
      if (block["heading_3"]) {
        const title = block["heading_3"].rich_text[0].plain_text;
        blockObj.type = "h3";
        blockObj.content = { content: title };
      }
      if (block["image"]) {
        const caption = ParseText(block["image"].caption);
        const url = block["image"].file.url;
        const contentObj = { url, caption, alt: "" };
        blockObj.type = "img";
        blockObj.content = contentObj;

        ImgArr.push({ index: i, url });
      }
      if (block["numbered_list_item"]) {
        OlArr.push({
          type: "ordered",
          index: i,
          content: ParseText(block["numbered_list_item"].rich_text),
        });
      }
      if (block["paragraph"]) {
        const content = ParseText(block["paragraph"].rich_text);
        blockObj.type = "p";
        blockObj.content = content;
      }
      if (block["quote"]) {
        const content = ParseText(block["quote"].rich_text);
        blockObj.type = "blockquote";
        blockObj.content = content;
      }

      if (block["toggle"]) {
        const toggleObj = { index: i, id: block.id };
        const contentObj = {
          title: block["toggle"].rich_text[0].plain_text,
          content: [],
        };
        blockObj.type = "toggle";
        blockObj.content = contentObj;

        ChildArr.push(toggleObj);
      }
      if (block["video"]) {
        const caption = ParseText(block["video"].caption);
        const url = block["video"].external?.url || "";
        const contentObj: {
          url: string;
          caption: RichTextArr;
          type: "internal" | "external" | "youtube";
        } = { url, caption, type: "youtube" };
        blockObj.type = "video";
        blockObj.content = contentObj;

        ImgArr.push({ index: i, url });
      }

      BlockArr.push(blockObj);
    });

    console.log("Parsing the Ordered List");
    const OlParse = ListParse(OlArr);

    for (const [key, value] of Object.entries(OlParse)) {
      const newOlObj: ListObject = {
        type: "ordered",
        content: [],
      };
      const referenceValue: number = value[0].index;
      value.forEach((item: UnparsedListItem) => {
        newOlObj.content.push(item.content);
      });
      BlockArr[referenceValue].type = "ol";
      BlockArr[referenceValue].content = newOlObj;
      console.log("Created Ordered List Block");
    }

    console.log("Parsing the Unordered List Items");
    const UlParse = ListParse(UlArr);

    for (const [key, value] of Object.entries(UlParse)) {
      const newUlObj: ListObject = {
        type: "unordered",
        content: [],
      };
      const referenceValue: number = value[0].index;
      value.forEach((item: UnparsedListItem) => {
        newUlObj.content.push(item.content);
      });
      BlockArr[referenceValue].type = "ul";
      BlockArr[referenceValue].content = newUlObj;
      console.log("Created Unordered List Block");
    }
    try {
      const client = await serverPromise.catch((error) =>
        console.log("error on connect", error)
      );
      if (client) {
        const db = client.db("jako");
        const collection = db.collection("posts");

        const query = { id: id };
        const update = {
          $set: {
            id: id,
            content: BlockArr,
            images: ImgArr,
            sections: TitleArr,
          },
        };
        const options = { upsert: true };

        await collection.updateOne(query, update, options);
      }
    } catch (e) {
      console.error(e);
    } finally {
      await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          hasBlocks: true,
        },
      });
    }
  });

  return NextResponse.json({ pages });
}
