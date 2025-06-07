"use client"
import { useEffect, useState } from "react"

export const useDebounce = (value : any , delay=500) => { 
    const [debounceValue,setDebounceValue] = useState(value)

        useEffect(() => {
        const handler = setTimeout(() => {
        setDebounceValue(value)
        }, delay)

        return () => {
        clearTimeout(handler)
        }
    }, [value, delay])
    return debounceValue
}