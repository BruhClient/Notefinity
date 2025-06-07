"use client"

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'

const LogOutButton = () => {
  return (
    <Button className='w-full' onClick={() => signOut({callbackUrl : "/"})} variant={"outline"}><LogOut />Log Out</Button>
  )
}

export default LogOutButton
