import { TextBlock } from "@/lib/blog";
import RichText from "./helpers/richText";
import Quotes from "@/lib/svg/Quotes";

export default function Quote({ block }: { block: TextBlock }) {
  const { content } = block;
  return (
    <blockquote className="blocks-quote">
      <Quotes className="blocks-quote--svg" />
      <p>
        {content.map((section, i) => (
          <RichText elem={section} key={i} />
        ))}
      </p>
    </blockquote>
  );
}
