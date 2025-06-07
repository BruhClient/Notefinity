import React from 'react'
import PricingCard from '../PricingCard'
import { TextReveal } from '../magicui/text-reveal'
import { BoxReveal } from '../magicui/box-reveal'

const Pricing = () => {
  return (
    <div className='flex flex-col items-center' id='pricing'>

        <div className='space-y-5'>

            <TextReveal className='lg:text-6xl text-4xl font-bold max-w-[1200px] text-center '>
                Simple pricing for everyone.
            </TextReveal>
            <BoxReveal>
                <div className='font-serif lg:text-xl max-w-[900px] text-center text-lg '>
                Try our product for free . If you like what we provide , upgrade to our <b>Pro Plan</b>. No hidden fees , no subscriptions .
                </div>

            </BoxReveal>
            

            <div className='flex w-full gap-3 lg:flex-row flex-col items-center'>
                <PricingCard pricingType='Free'/>
                <PricingCard pricingType='Pro'/>
            </div>

        </div>

        
      
    </div>
  )
}

export default Pricing
