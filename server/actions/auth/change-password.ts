"use server"

import { updateUserByEmail } from "@/server/db/users"
import bcryptjs from "bcryptjs"

export const changePassword = async (email: string, password: string) => {
  try {
    const formattedEmail = email.toLowerCase()

    const hashedPassword = await bcryptjs.hash(password, 4)
    await updateUserByEmail(formattedEmail, {
      hashedPassword,
    })

    return {
      success: "Password Changed",
    }
  } catch {
    return {
      error: "Something went wrong",
    }
  }
}
