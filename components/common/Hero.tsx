import React from 'react'
import { AnimatedBadge } from './AnimatedBadge'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { TypingAnimation } from '../magicui/typing-animation'
import { MotionDiv } from '../Motion'
import { boxVariants } from '@/lib/variants'
import { BoxReveal } from '../magicui/box-reveal'

const Hero = () => {
  return (

    <div className='flex flex-col items-center justify-center gap-3 h-[70vh] '>

     
        <AnimatedBadge />
       
        
        <div className="flex flex-col text-center justify-center items-center gap-4">
            <MotionDiv className='lg:text-6xl text-4xl font-bold max-w-[1200px] text-center ' variants={boxVariants} initial={"hidden"} animate={"visible"}>
                Notefinity is the new way to create notes and learn from others.
            </MotionDiv>
            <BoxReveal >

              <div className='font-serif font-normal lg:text-xl max-w-[700px] text-lg '>
                Beautifully designed, AI Integrated dashboard built with
                Tailwind CSS, React, and Framer Motion.
              </div>
                
            </BoxReveal>
        </div>

        <Button className='mt-5' asChild><Link href={"/signup"}>Get Started for free <ChevronRight /></Link></Button>


    </div>

    
  )
}

export default Hero
