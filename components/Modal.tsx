"use client"
import { useRouter } from "next/navigation"
import { FunctionComponent } from "react"
import { Dialog, DialogContent } from "./ui/dialog"

interface ModalProps {
  children: React.ReactNode
}

const Modal: FunctionComponent<ModalProps> = ({ children }) => {
  const router = useRouter()

  const handleOpenChange = () => {
    router.back()
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
