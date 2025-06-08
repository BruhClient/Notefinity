"use client"

import Features from "@/components/common/Features"
import Footer from "@/components/common/Footer"
import Hero from "@/components/common/Hero"
import { MarqueeDisplay } from "@/components/common/MarqueeDisplay"
import Pricing from "@/components/common/Pricing"
import { SafariMockUp } from "@/components/common/SafariMockUp"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="px-4 flex flex-col gap-14 justify-center items-center">
      <Hero />

      <SafariMockUp />

      <Features />
      <Pricing />

      <Card className="overflow-hidden max-w-[800px] w-full h-[400px] relative">
        <MarqueeDisplay />

        <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4">
          <div className="font-bold text-4xl text-center">
            What are you waiting for ?
          </div>
          <Button asChild>
            <Link href={"/signup"}>Try Notefinity for Free !</Link>
          </Button>
        </div>
      </Card>

      <Footer />
    </div>
  )
}
