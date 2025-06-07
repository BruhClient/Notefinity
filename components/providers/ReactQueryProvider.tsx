"use client"

import React from 'react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const query = new QueryClient
const ReactQueryProvider = ({children}  : {children : React.ReactNode}) => {
  return (
    <QueryClientProvider client={query}>
      {children}

    
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
