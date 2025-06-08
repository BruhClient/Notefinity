"use client";
import React from "react";
import { AnimatedBadge } from "./AnimatedBadge";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MotionDiv } from "../Motion";
import { boxVariants } from "@/lib/variants";
import { BoxReveal } from "../magicui/box-reveal";
import { motion } from "motion/react";

const Highlight = ({
  children,
  color = "#81fcbf",
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  return (
    <span className="relative inline-block">
      {/* Word */}
      <span className="relative z-10">{children}</span>

      {/* Animated path underline */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[0.45em] z-0"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0 8 H100"
          stroke={color} // Tailwind yellow-400
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
};

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-[70vh]">
      <AnimatedBadge />

      <div className="flex flex-col text-center justify-center items-center gap-4">
        <MotionDiv
          className="lg:text-6xl text-4xl font-bold max-w-[1200px] text-center"
          variants={boxVariants}
          initial="hidden"
          animate="visible"
        >
          Notefinity is the new way to <Highlight>create</Highlight> notes and{" "}
          <Highlight>learn</Highlight> from others.
        </MotionDiv>

        <BoxReveal>
          <div className="font-serif font-normal lg:text-xl max-w-[700px] text-lg">
            Beautifully designed, AI Integrated dashboard built with Tailwind
            CSS, React, and Framer Motion.
          </div>
        </BoxReveal>
      </div>

      <Button className="mt-5" asChild>
        <Link href="/signup">
          Get Started for free <ChevronRight />
        </Link>
      </Button>
    </div>
  );
};

export default Hero;
