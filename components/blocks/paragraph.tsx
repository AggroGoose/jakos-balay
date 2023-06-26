import { TextBlock } from "@/lib/blog";
import RichText from "./helpers/richText";

export default function Paragraph({ block }: { block: TextBlock }) {
  const { content } = block;
  return (
    <p>
      {content.map((section, i) => (
        <RichText elem={section} key={i} />
      ))}
    </p>
  );
}
