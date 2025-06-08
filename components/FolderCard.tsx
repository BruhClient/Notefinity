"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "./ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Heart, MessageCircle, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { timeAgo } from "@/lib/time"

export const FolderCard = ({
  id,
  name,
  username,
  image,
  likes,
  comments,
  createdAt,
}: {
  id: string
  name: string
  username: string
  image: string | null
  likes: number
  comments: number
  createdAt: Date
}) => {
  const router = useRouter()
  return (
    <Card
      className="hover:bg-muted hover:text-muted-foreground cursor-pointer"
      onClick={() => router.push(`/folders/${id}`)}
    >
      <CardContent className="flex gap-4 flex-col">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={image ?? ""}></AvatarImage>
            <AvatarFallback>
              <User size={13} />
            </AvatarFallback>
          </Avatar>

          <div className=" font-semibold">{username}</div>
        </div>
        <div className="flex gap-2 flex-col">
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>{timeAgo(createdAt)}</CardDescription>

          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center text-muted-foreground">
              {likes} <Heart size={15} />
            </div>
            <div className="flex gap-2 items-center text-muted-foreground">
              {comments} <MessageCircle size={15} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const FolderLoadingSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex gap-4 flex-col">
        <div className="flex gap-2 items-center">
          <Skeleton className="w-8 h-8 rounded-full" />

          <Skeleton className="w-16 h-5 rounded-lg" />
        </div>
        <div className="flex gap-2 flex-col">
          <Skeleton className="w-32 h-5 rounded-lg" />
          <Skeleton className="w-16 h-5 rounded-lg" />

          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center text-muted-foreground">
              <Skeleton className="w-5 h-5 rounded-lg" />{" "}
              <Skeleton className="w-8 h-5 rounded-lg" />
            </div>
            <div className="flex gap-2 items-center text-muted-foreground">
              <Skeleton className="w-5 h-5 rounded-lg" />{" "}
              <Skeleton className="w-8 h-5 rounded-lg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
