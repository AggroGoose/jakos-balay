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

export default function ParseText(textArr: Array<NotionRichText>) {
  const newTextArr: RichTextArr = [];
  textArr.forEach((textObj) => {
    const newTextObj = {
      content: textObj.plain_text,
      emphasis: {
        bold: textObj.annotations.bold,
        italic: textObj.annotations.italic,
        underline: textObj.annotations.underline,
        strikethrough: textObj.annotations.strikethrough,
      },
      link: textObj.href,
    };
    newTextArr.push(newTextObj);
  });
  return newTextArr;
}
