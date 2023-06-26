import {
  BlogBlock,
  EmbedBlock,
  HeadBlock,
  ImgBlock,
  ListBlock,
  TextBlock,
  VidBlock,
} from "@/lib/blog";
import Header from "./blocks/head";
import Paragraph from "./blocks/paragraph";
import Quote from "./blocks/quote";
import List from "./blocks/list";
import CallOut from "./blocks/callout";
import ImageBlock from "./blocks/image";
import VideoBlock from "./blocks/video";
import Embed from "./blocks/embed";

export default function ContentBuilder({
  content,
  className,
}: {
  content: BlogBlock[];
  className?: string;
}) {
  return (
    <div className={className ? className : ""}>
      {content.map((block, i) => {
        if (block.type === "h1" || block.type === "h2" || block.type === "h3")
          return <Header block={block as HeadBlock} key={i} />;
        if (block.type === "p")
          return <Paragraph block={block as TextBlock} key={i} />;
        if (block.type === "blockquote")
          return <Quote block={block as TextBlock} key={i} />;
        if (block.type === "ol" || block.type === "ul")
          return <List block={block as ListBlock} key={i} />;
        if (block.type === "callout")
          return <CallOut block={block as TextBlock} key={i} />;
        if (block.type === "img")
          return <ImageBlock block={block as ImgBlock} key={i} />;
        if (block.type === "toggle") return <></>;
        if (block.type === "video")
          return <VideoBlock block={block as VidBlock} />;
        if (block.type === "embed")
          return <Embed block={block as EmbedBlock} />;
        if (block.type === "hr") return <hr />;
        return <></>;
      })}
    </div>
  );
}
