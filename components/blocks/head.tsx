import { HeadBlock } from "@/lib/blog";

export default function Header({ block }: { block: HeadBlock }) {
  if ((block.type = "h1")) return <h1>{block.content.content}</h1>;
  if ((block.type = "h2")) return <h2>{block.content.content}</h2>;
  if ((block.type = "h3")) return <h3>{block.content.content}</h3>;
  return <></>;
}
