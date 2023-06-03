import { NextResponse } from "next/server";
import notion from "@/lib/notion/notion";

export async function GET() {
  const page = await notion.databases.retrieve({
    database_id: "54054c5f7fe74b069986cf3db889cbe1",
  });

  return NextResponse.json({ page });
}

// export async function GET() {
//   const page = await notion.blocks.children.list({
//     block_id: "eb09f787-144b-4008-9554-ad06e21f7c06",
//     page_size: 50,
//   });

//   return NextResponse.json({ page });
// }

// export async function GET() {
//   const page = await notion.blocks.children.list({
//     block_id: "13b06007-d153-4ba4-a1e8-835a3c52049b",
//     page_size: 50,
//   });

//   return NextResponse.json({ page });
// }

// export async function GET() {
//   const page = await notion.databases.query({
//     database_id: "54054c5f7fe74b069986cf3db889cbe1",
//     filter: {
//       property: "Status",
//       status: {
//         equals: "Published",
//       },
//     },
//   });

//   return NextResponse.json({ page });
// }
