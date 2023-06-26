import { TextBlock } from "@/lib/blog";
import RichText from "./helpers/richText";

export default function Quote({ block }: { block: TextBlock }) {
  const { content } = block;
  return (
    <blockquote>
      {content.map((section, i) => (
        <RichText elem={section} key={i} />
      ))}
    </blockquote>
  );
}
