

import React, { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { MotionDiv } from '../Motion'
import { Bot, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { boxVariants } from '@/lib/variants'
import { AnimatedComments } from './AnimatedComments'
import { IconCloudDisplay } from './IconCloud'
import { AnimatedBeamDisplay } from './AnimatedBeamDisplay'

const BentoGrid = () => {
  return (
    <div className='grid grid-cols-12 max-w-[1200px] w-full  gap-2'>
        <MainBlock />
        <CommunityBlock />
        <FeedbackBlock />
    </div>
  )
}

export default BentoGrid



const messages = [ 
  { 
    role: "bot", 
    message: "Hi! How can I help you today?" 
  },
  { 
    role: "user", 
    message: "What are neural networks?" 
  },
  { 
    role: "bot", 
    message: "Neural networks are a type of machine learning model inspired by how the human brain works. They’re made up of layers of connected nodes (or 'neurons') that can learn patterns from data." 
  },
  { 
    role: "user", 
    message: "Can you give me a real-world example?" 
  },
  { 
    role: "bot", 
    message: "Sure! One common example is in healthcare—neural networks are used to analyze chest X-rays and detect conditions like pneumonia." 
  },
  { 
    role: "user", 
    message: "That’s cool. Are they always accurate?" 
  },
  { 
    role: "bot", 
    message: "They can be very accurate, but not perfect. Their performance depends on the quality and amount of training data. In healthcare, they assist doctors but don't replace them." 
  },
  { 
    role: "user", 
    message: "Are they used in other areas too?" 
  },
  { 
    role: "bot", 
    message: "Absolutely! Neural networks are used in self-driving cars, voice assistants like Siri, fraud detection in banking, and even in video game AI." 
  },
  { 
    role: "user", 
    message: "How do they learn exactly?" 
  },
  { 
    role: "bot", 
    message: "They learn by adjusting internal weights using training data. The goal is to reduce the difference between the predicted output and the correct one — this process is called training or optimization." 
  },
  { 
    role: "user", 
    message: "Thanks! That really helped." 
  },
  { 
    role: "bot", 
    message: "You're welcome! Let me know if you have more questions about your notes." 
  }
];


const MainBlock = () => { 
    return <Card className='col-span-12 md:col-span-8 row-span-2'>
            <CardHeader>
                <CardTitle>
                    Talk directly with your notes
                </CardTitle>
                <CardDescription>
                    Ai Assistant that summarises all notes in your folder
                </CardDescription>
            </CardHeader>
            <CardContent className='h-full flex justify-center items-center'>
               
                  
               
                
                <MotionDiv className='flex flex-col gap-2 py-2 ' >
                    {messages.map((message,index) => {

                            if (message.role === "bot") { 
                            return <MotionDiv variants={boxVariants}  initial={"hidden"} whileInView={"visible"} viewport={{ once: true, margin: "-100px" }}  className='w-full flex justify-start items-center gap-2 font-serif' key={index}>
                                <Bot className='text-foreground' />
                                <div className='w-fit bg-muted text-foreground px-2 py-1 rounded-lg'>{message.message}</div>
                            </MotionDiv>
                            }
                            return <MotionDiv className='w-full text-primary-foreground flex justify-end items-center gap-2 font-serif' key={index} variants={boxVariants} viewport={{ once: true, amount: 0.5, margin: "-100px" }} initial={"hidden"} whileInView={"visible"}>
                                
                                <div className='w-fit bg-primary px-2 py-1 rounded-lg'>{message.message}</div>
                                <div className='bg-muted p-2 rounded-full'>
                                    <User  size={18} color='black'/>
                                </div>
                            </MotionDiv>
                    })}
                </MotionDiv>
                
            </CardContent>
            <CardFooter className='flex flex-col items-start'>
                <div className='font-bold'>
                    Ai Assistant answers strictly based on your notes.
                </div>
                <div className='text-sm  text-muted-foreground'>
                    This is to prevent any confusion or misintepretation.
                </div>
            </CardFooter>
    </Card>
}

const CommunityBlock = () => { 
    return <Card className='md:col-span-4 col-span-12'>
        <CardHeader>
            <CardTitle>
                Strong Community
            </CardTitle>
            <CardDescription>
                Search for related notes written by other people
            </CardDescription>
        </CardHeader>
        <CardContent>
            <IconCloudDisplay />
        </CardContent>
        <CardFooter className='flex flex-col items-start'>
                <div className='font-bold'>
                    Find people of similiar interest .
                </div>
                <div className='text-sm  text-muted-foreground'>
                    Give feedback on other's notes.
                </div>
        </CardFooter>
        
    </Card>
}

const FeedbackBlock = () => { 
    return <Card className='md:col-span-4 col-span-12'>
                <CardHeader>
                    <CardTitle>
                        Get Feedback
                    </CardTitle>
                    <CardDescription>
                        Make your notes sharable for others to critique and learn from
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AnimatedComments />
                </CardContent>
    </Card>
}