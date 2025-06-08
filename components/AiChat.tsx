"use client"

import useSessionUser from "@/hooks/use-session-user"
import React, { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Bot, Send, User, X } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { useChat } from "ai/react"
import { MotionDiv } from "./Motion"
import { boxVariants } from "@/lib/variants"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "./ui/separator"
import { AnimatePresence } from "motion/react"
const AiChat = ({
  folderId,
  folderName,
}: {
  folderId: string
  folderName: string
}) => {
  const user = useSessionUser()
  const [isOpen, setIsOpen] = useState(false)
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat({
    api: "/api/chat",
    body: {
      folderId,
      folderName,
    },
  })

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])
  if (!user) return null

  return (
    <>
      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card
              className="
            fixed bottom-4 right-4
            w-[90vw] max-w-md
            max-h-[90vh]
            
            z-50
            shadow-lg
            rounded-xl
          "
            >
              <CardContent>
                <div className="flex items-center justify-between ">
                  <div className="flex gap-3 items-center">
                    <div className="bg-green-300 p-2 rounded-full">
                      <Bot size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        Notefinity Ai
                      </CardTitle>
                      <CardDescription>{folderName} folder</CardDescription>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <Separator className="my-2" />

                <main
                  className="flex flex-col gap-2 overflow-y-auto py-2 text-sm h-[400px]"
                  ref={scrollRef}
                >
                  {messages.map((message) => {
                    if (message.role === "assistant") {
                      return (
                        <MotionDiv
                          variants={boxVariants}
                          initial={"hidden"}
                          animate={"visible"}
                          className="w-full flex justify-start items-center gap-2 font-serif"
                          key={message.id}
                        >
                          <Bot className="text-foreground" />
                          <div className="w-fit bg-muted text-foreground px-2 py-1 rounded-lg">
                            {message.content}
                          </div>
                        </MotionDiv>
                      )
                    }
                    return (
                      <MotionDiv
                        className="w-full text-primary-foreground flex justify-end items-center gap-2 font-serif"
                        key={message.id}
                        variants={boxVariants}
                        initial={"hidden"}
                        animate={"visible"}
                      >
                        <div className="w-fit bg-primary px-2 py-1 rounded-lg">
                          {message.content}
                        </div>
                        <Avatar>
                          <AvatarImage src={user?.image}></AvatarImage>
                          <AvatarFallback>
                            <User />
                          </AvatarFallback>
                        </Avatar>
                      </MotionDiv>
                    )
                  })}

                  {isLoading && (
                    <div
                      className="w-full text-primary-foreground flex justify-start items-center gap-2 font-serif"
                      key={"loading"}
                    >
                      <Bot className="text-foreground" />
                      <div className="w-fit bg-primary px-2 py-1 rounded-lg flex items-center">
                        Thinking...
                      </div>
                    </div>
                  )}
                </main>
              </CardContent>

              <CardFooter>
                <form className="flex w-full gap-1" onSubmit={handleSubmit}>
                  <Input
                    value={input}
                    className="flex-1"
                    onChange={handleInputChange}
                    placeholder="What's on your mind ?"
                  />
                  <Button size={"icon"} disabled={isLoading}>
                    <Send />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 shadow-lg"
            size={"icon"}
          >
            <Bot className="w-4 h-4" />
          </Button>
        </div>
      )}
    </>
  )
}

export default AiChat
