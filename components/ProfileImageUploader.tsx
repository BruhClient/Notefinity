"use client"

import React, { useTransition } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { User } from "lucide-react"
import { useUploadThing } from "@/lib/uploadthing"
import { changeProfilePic } from "@/server/actions/auth/profile-image"
import { useSession } from "next-auth/react"
import { ClipLoader } from "react-spinners"
import { showErrorToast, showSuccessToast } from "@/lib/toast"

const ProfilePicChanger = ({ initialImage }: { initialImage: string }) => {
  const { startUpload } = useUploadThing("imageUploader")

  const [isPending, startTransition] = useTransition()

  const { update } = useSession()

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0] as File

    if (file) {
      startTransition(async () => {
        const resp = await startUpload([file])

        if (!resp) {
          return
        }

        const data = await changeProfilePic(resp[0].ufsUrl)

        if (data.success) {
          showSuccessToast(data.success)
        } else {
          showErrorToast(data.error)
        }

        update()
      })
    }
  }

  return (
    <div className="flex justify-center">
      <Avatar className="w-32 h-32 pointer-events-auto ">
        {isPending && (
          <div className="w-full h-full bg-black absolute opacity-50 flex justify-center items-center z-50">
            <ClipLoader color="white" className="opacity-100" />
          </div>
        )}
        <AvatarImage
          src={initialImage}
          className="object-cover "
          alt="@profile"
        />
        <AvatarFallback>
          <User />
        </AvatarFallback>
        <input
          type="file"
          disabled={isPending}
          accept="image/*"
          onChange={handleImageChange}
          style={{
            position: "absolute",

            opacity: 0,
            cursor: "pointer",

            width: "100%",
            height: "100%",
          }}
        />
      </Avatar>
    </div>
  )
}

export default ProfilePicChanger
