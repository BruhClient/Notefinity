"use client"

import useSessionUser from '@/hooks/use-session-user'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Menu, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import UserProfile from './auth/UserProfile'


const links = [
    { 
        name : "Home", 
        href : '/dashboard', 

    },
    { 
        name : "Folders", 
        href : '/folders', 
        
    },
    { 
        name : "Settings", 
        href : '/settings', 
        
    },
    { 
        name : "Community", 
        href : '/community', 
        
    }
]
const Navbar = () => {
    const user = useSessionUser()
    const pathname = usePathname()
  return (
    <div className='px-6 py-3 flex w-full items-center justify-between flex-wrap gap-2'>

        <div className='font-bold text-2xl self-center'>
            Notefinity
        </div>
        

        {
            user ? <>


                    <div className='hidden md:flex  gap-10'>
                            { 
                                links.map((link) => { 
                                    return <Link key={link.name} className={cn('font-semibold sm:text-xl hover:underline underline-offset-5',pathname=== link.href && "underline ")} href={link.href}>{link.name}</Link>
                                })
                            }
                    </div>
                    <div className='hidden md:block'>
                        <UserProfile />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger className='md:hidden' asChild>
                            <Button variant={"outline"} size={"icon"}><Menu /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='mx-2 p-2'>
                            
                         
                            { 
                                links.map((link) => { 
                                    return <DropdownMenuItem key={link.name} asChild><Link className={cn('text-lg hover:underline underline-offset-5',pathname=== link.href && "underline ")} href={link.href}>{link.name}</Link></DropdownMenuItem>
                                })
                            }
                        </DropdownMenuContent>

                    </DropdownMenu>





            
            
            </>:<div className='flex gap-2'>
                <Button variant={"outline"} asChild><Link href={"/signup"}>Get Started</Link></Button>
                <Button asChild><Link href={"/signin"}>Login</Link></Button>
            </div>
        }

 
        
      
    </div>
  )
}

export default Navbar
