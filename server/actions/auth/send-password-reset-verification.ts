"use server"

import { sendPasswordResetEmail } from "@/server/db/auth/mail"
import { generatePasswordResetToken } from "@/server/db/auth/password-reset-token"
import { getUserByEmail } from "@/server/db/users"

export const sendPasswordResetVerification = async (email: string) => {
  try {
    const formattedEmail = email.toLowerCase()

    const userExists = await getUserByEmail(formattedEmail)

    if (!userExists) {
      return {
        error: "There is no user with this email. Please try again",
      }
    }

    if (userExists.isOauth) {
      return {
        error:
          "The email you provided has an account connected to a different provider.",
      }
    }
    const passwordResetToken = await generatePasswordResetToken(formattedEmail)
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.code,
    )

    return {
      success: "6 Digit code sent !",
    }
  } catch (error) {
    return {
      error: "Something went wrong",
    }
  }
}
