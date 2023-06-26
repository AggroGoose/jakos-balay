import { ListBlock } from "@/lib/blog";
import RichText from "./helpers/richText";

export default function List({ block }: { block: ListBlock }) {
  if (block.type == "ol")
    return (
      <ol>
        {block.content.content.map((item, i) => (
          <li key={i}>
            {item.map((elem, i) => (
              <RichText key={i} elem={elem} />
            ))}
          </li>
        ))}
      </ol>
    );
  if (block.type == "ul")
    return (
      <ul>
        {block.content.content.map((item, i) => (
          <li key={i}>
            {item.map((elem, i) => (
              <RichText key={i} elem={elem} />
            ))}
          </li>
        ))}
      </ul>
    );
  return <></>;
}
