import { Safari } from "@/components/magicui/safari";

export function SafariMockUp() {
  return (
    <div className="max-w-7xl w-full h-fit object-cover">
      <Safari
        url="notefinityai.com"
        className="size-full"
        mode="simple"
        imageSrc="/HeroImg.png"

      />
    </div>
  );
}
