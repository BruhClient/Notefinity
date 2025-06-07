"use client"
import { pricingTypes } from '@/data/pricingTypes'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Check, X } from 'lucide-react'
import { Button } from './ui/button'
import useSessionUser from '@/hooks/use-session-user'
import { useRouter } from 'next/navigation'

const CustomCheck = () => <div className='bg-green-400 p-1 rounded-full '><Check className='text-black' size={15}/></div>
const CustomX = () => <div  className='bg-red-400 p-1 rounded-full '><X size={15} className='text-black'/></div>


const PricingCard = ({pricingType} : {pricingType : "Free" | "Pro"}) => {


    const {price,description,originalPrice,link,support,folderAmount,noteAmount,community,aiChat} = pricingTypes[pricingType]
    const user = useSessionUser()
    const router = useRouter()


    
    
  return (
    <Card className='max-w-[500px] w-full'>
        <CardHeader>
                <CardTitle className='text-2xl font-serif '>{pricingType}</CardTitle>
                <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className='flex flex-col gap-4'>
                                <div>
                                    {originalPrice && <span className='line-through text-muted-foreground text-start pr-2'>${originalPrice}</span>}
                                    
                                    <span className='text-4xl font-serif font-bold'>${price}</span>
                                </div>
                                <Button className='w-full' variant={"outline"} disabled={user?.plan === pricingType } onClick={() => router.push(link ? `${link}?prefilled_email=${user?.email}` : "/signin")}>
                                    
                                        {user?.plan === pricingType ? "Your Current Plan" : "Get Started"}
                                    
                                </Button>
                                <div className='flex flex-col gap-2 py-5 px-1'>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        <CustomCheck /> {folderAmount} projects
                                    </div>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        <CustomCheck /> {noteAmount} projects
                                    </div>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        {support ? <CustomCheck /> : <CustomX />} 24/7 support
                                    </div>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        {aiChat ? <CustomCheck /> : <CustomX />} Unlimited Ai Chats
                                    </div>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        {community ? <CustomCheck /> : <CustomX />} Community
                                    </div>
                                    
                                    

                                    
                                </div>
    
                                
                </CardContent>
      
    </Card>
  )
}

export default PricingCard
