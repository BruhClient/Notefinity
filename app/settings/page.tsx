

import EditProfileForm from '@/components/forms/profile'
import ProfilePicChanger from '@/components/ProfileImageUploader'

import { Separator } from '@/components/ui/separator'
import { auth } from '@/lib/auth'
import React from 'react'
import LogOutButton from './_components/LogOutButton'
import PricingCard from '@/components/PricingCard'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { ModeToggle } from '@/components/ModeToggle'


const SettingsPage = async () => {
    const session = await auth()
  return (
    <div className='flex items-center flex-col px-3 py-4 gap-6'>
        
        
        
            <div className='w-full max-w-[600px] flex flex-col gap-3 self-center '>
            
                    <ProfilePicChanger initialImage={session?.user.image ?? ""}/>
                                
                    <Separator className='w-full'/>
                                
                    <EditProfileForm />
                                

                <LogOutButton />
            </div>

            <Card className='max-w-[600px] w-full'>
              <CardContent className=' flex w-full justify-between items-center'>
                <div>
                  <CardTitle>
                    Appearance
                  </CardTitle>
                  <CardDescription>
                    System , Light and Dark.
                  </CardDescription>
                </div>

                <div>
                  <ModeToggle />
                </div>
              </CardContent>
            </Card>

       

       
            <div className='w-full flex gap-1 justify-center flex-wrap'>

                <PricingCard pricingType='Free'/>
                <PricingCard pricingType='Pro'/>
                    
            </div>

            

        

        
        
        


      
      
    </div>
  )
}

export default SettingsPage
