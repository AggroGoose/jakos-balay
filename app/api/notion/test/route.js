import { NextResponse } from "next/server";
import notion from "@/lib/notion/notion";

export async function GET() {
  const page = await notion.blocks.children.list({
    block_id: "13b06007-d153-4ba4-a1e8-835a3c52049b",
    page_size: 50,
  });

  return NextResponse.json({ page });
}
