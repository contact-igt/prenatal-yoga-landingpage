import Image from "next/image";

type YogaIconName = "prenatal-pose" | "breathing" | "home" | "warmup" | "mobility" | "lotus" | "guidance" | "adaptation" | "practice";

export function YogaIcon({ name }: { name: YogaIconName }) {
  return (
    <Image
      className="yoga-icon"
      src={`/images/yoga-icons/${name}.webp`}
      alt=""
      width={128}
      height={128}
      unoptimized
    />
  );
}
