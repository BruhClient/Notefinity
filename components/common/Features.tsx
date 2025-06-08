import React from "react";
import BentoGrid from "./BentoGrid";
import { TextReveal } from "../magicui/text-reveal";
import { BoxReveal } from "../magicui/box-reveal";

const Features = () => {
  return (
    <div
      className="w-full flex justify-center flex-col items-center gap-8"
      id="features"
    >
      <div className="space-y-5 max-w-[900px]">
        <TextReveal className="text-5xl font-bold  text-center ">
          Everything at your fingertips.
        </TextReveal>
        <BoxReveal>
          <div className="font-serif lg:text-xl text-center text-lg ">
            Talk to your notes through AI , gather feedback on your notes ,
            organise your folders . We have everything you could possibly need
            tightly integrated !
          </div>
        </BoxReveal>
      </div>

      <BentoGrid />
    </div>
  );
};

export default Features;
