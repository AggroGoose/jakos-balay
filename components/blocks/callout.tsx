import { TextBlock } from "@/lib/blog";
import RichText from "./helpers/richText";

export default function CallOut({ block }: { block: TextBlock }) {
  const { content } = block;
  return (
    <div className="blocks-callout">
      {content.map((section, i) => (
        <RichText elem={section} key={i} />
      ))}
    </div>
  );
}
