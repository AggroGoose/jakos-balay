import { RichTextElem } from "@/lib/blog";

export default function RichText({ elem }: { elem: RichTextElem }) {
  return (
    <LinkCheck elem={elem}>
      <EmphasisCheck elem={elem}>{elem.content}</EmphasisCheck>
    </LinkCheck>
  );
}

function LinkCheck({
  children,
  elem,
}: {
  children: React.ReactNode;
  elem: RichTextElem;
}) {
  if (elem.link) {
    return <a href={elem.link}>{children}</a>;
  } else {
    return <>{children}</>;
  }
}

function EmphasisCheck({
  children,
  elem,
}: {
  children: React.ReactNode;
  elem: RichTextElem;
}) {
  const spanCheck = (elem: RichTextElem) => {
    const { emphasis } = elem;
    if (
      emphasis.bold ||
      emphasis.italic ||
      emphasis.strikethrough ||
      emphasis.underline
    )
      return true;
    return false;
  };
  const classBuilder = `${elem.emphasis.bold ? "bld " : ""}${
    elem.emphasis.italic ? "itl " : ""
  }${elem.emphasis.underline ? "udl " : ""}${
    elem.emphasis.strikethrough ? "str" : ""
  }`;
  if (spanCheck(elem)) {
    return <span className={classBuilder}>{children}</span>;
  } else {
    return <>{children}</>;
  }
}
