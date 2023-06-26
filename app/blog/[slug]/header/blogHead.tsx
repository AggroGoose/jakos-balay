import BlogFeature from "./blogFeature";

export default function BlogHead({
  featureImg,
  title,
  datePublished,
  subCategoryName,
  summary,
}: {
  featureImg: string | null;
  title: string;
  datePublished: Date;
  subCategoryName: string;
  summary: string | null;
}) {
  const parseDate = new Date(datePublished);
  return (
    <div className="blog-head primary-grid">
      <div className="blog-head--subcategory">
        <p>{subCategoryName}</p>
      </div>
      <h1 className="blog-head--title">{title}</h1>
      <p className="blog-head--summary">{summary}</p>
      <p className="blog-head--date">{parseDate.toDateString()}</p>
      {featureImg && <BlogFeature featureImg={featureImg} />}
    </div>
  );
}
