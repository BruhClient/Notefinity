import { auth } from "@/lib/auth"
import React, { Suspense } from "react"
import FolderCount from "./_components/FolderCount"
import { redirect } from "next/navigation"
import NoteCount from "./_components/NoteCount"
import CreateFolder from "./_components/CreateFolder"
import { Skeleton } from "@/components/ui/skeleton"
import FolderGrid from "./_components/FolderGrid"

const FoldersPage = async () => {
  const session = await auth()

  if (!session) {
    redirect("/")
  }
  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 px-3 gap-2">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <FolderCount userId={session.user.id} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <NoteCount userId={session.user.id} />
        </Suspense>
        <CreateFolder userId={session.user.id} />
      </div>

      <Suspense fallback="loading...">
        <FolderGrid userId={session.user.id} />
      </Suspense>
    </div>
  )
}

export default FoldersPage
