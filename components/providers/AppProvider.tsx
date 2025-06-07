"use client"

import React from 'react'
import { ThemeProvider } from './ThemeProvider'
import { SessionProvider } from 'next-auth/react'
import ReactQueryProvider from './ReactQueryProvider'

const AppProvider = ({children} : {children : React.ReactNode}) => {
  return (
    
          
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            <ReactQueryProvider>

              <SessionProvider>
          
                {children}
        
        
              </SessionProvider>

              
            </ReactQueryProvider>
            
          
          
        </ThemeProvider>
     
  )
}

export default AppProvider
