import { Client } from "@notionhq/client";

let notion: Client;

if (process.env.NODE_ENV === "production") {
  notion = new Client({ auth: process.env.NOTION_SECRET });
} else {
  if (!global.gnotion) {
    global.gnotion = new Client({ auth: process.env.NOTION_SECRET });
  }
  notion = global.gnotion;
}

export default notion;
