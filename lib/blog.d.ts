export type EmbedObject = {
  url: string;
  id?: string;
  caption: RichTextArr;
  type: "twitter" | "instagram" | "other";
};

type ImageObject = {
  url: string;
  caption: RichTextArr;
  alt: string;
  height?: int;
  width?: int;
};

export interface ItemDict {
  [key: number]: UnparsedListItem[];
}

export type ListObject = {
  type: "ordered" | "unordered";
  content: Array<RichTextArr>;
};

export type UnparsedListItem = {
  type: "ordered" | "unordered";
  index: number;
  content: RichTextArr;
  group?: number;
};

type RichTextArr = Array<{
  content: string;
  emphasis: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
  };
  link: string | null;
}>;

type TitleObject = {
  content: string;
};

type ToggleDrop = {
  title: string;
  content: RichText;
};

type VideoObject = {
  url: string;
  caption: RichTextArr | never[];
  id?: string;
  type: "internal" | "external" | "youtube";
};

export type BlogBlock = {
  id: string | number;
  parentId: string | number;
  type:
    | "h1"
    | "h2"
    | "h3"
    | "p"
    | "blockquote"
    | "callout"
    | "img"
    | "video"
    | "embed"
    | "hr"
    | "toggle"
    | "ul"
    | "ol"
    | null;
  content:
    | RichTextArr
    | EmbedObject
    | ImageObject
    | ListObject
    | RichTextArr
    | TitleObject
    | ToggleDrop
    | VideoObject
    | null;
};

export type DbResults = {
  object: string;
  results: Array<ResultObject>;
  next_cursor: string | null;
  has_more: boolean;
  type: string;
  block: {};
};

export type ResultObject = {
  object: string;
  id: string;
  parent: {
    type: string;
    page_id: string;
  };
  created_time: Date;
  last_edited_time: Date;
  created_by: {};
  last_edited_by: {};
  has_children: boolean;
  archived: boolean;
  type: string;

  bulleted_list_item?: NotionRT;
  callout?: NotionCallout;
  divider?: {};
  embed?: NotionEmbed;
  heading_1?: NotionTitle;
  heading_2?: NotionTitle;
  heading_3?: NotionTitle;
  image?: NotionImage;
  numbered_list_item?: NotionRT;
  paragraph?: NotionRT;
  quote?: NotionRT;
  toggle?: NotionRT;
  video?: NotionVideo;
};

type NotionCallout = {
  rich_text: Array<NotionRichText>;
  icon: {
    type: string;
    emoji: string;
  };
  color: string;
};

type NotionEmbed = {
  caption: Array<NotionRichText>;
  url: string;
};

type NotionImage = {
  caption: Array<NotionRichText>;
  type: string;
  file: { url: string; expiry_time: Date };
};

type NotionTitle = {
  rich_text: Array<NotionRichText>;
  is_togglable: boolean;
  color: string;
};
type NotionRT = {
  rich_text: Array<NotionRichText>;
  color: string;
};

type NotionVideo = {
  caption: Array<NotionRichText>;
  type: string;
  internal?: {};
  external?: {
    url: string;
  };
};

type NotionRichText = {
  type: string;
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
};
