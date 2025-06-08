"use server"

import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByEmail,
} from "@/server/db/auth/password-reset-token"

export const verifyPasswordResetCode = async (email: string, code: string) => {
  try {
    const formattedEmail = email.toLowerCase()
    const passwordResetToken =
      await getPasswordResetTokenByEmail(formattedEmail)

    if (passwordResetToken?.code !== code) {
      return {
        error: "Code incorrect !",
      }
    }

    await deletePasswordResetTokenById(passwordResetToken.id)

    return {
      success: "Code Verified",
    }
  } catch (error) {
    return {
      error: "Something went wrong",
    }
  }
}
