import Image from "next/image";

export default function BlogFeature({ featureImg }: { featureImg: string }) {
  return (
    <div className="blog-head--feature">
      <Image
        src={featureImg}
        fill={true}
        alt={"Feature image depicting great features bro."}
        priority={true}
      />
    </div>
  );
}
