"use server"

import { signIn } from "@/lib/auth"
import { sendVerificationEmail } from "@/server/db/auth/mail"
import { getUserByEmail } from "@/server/db/users"
import { generateVerificationToken } from "@/server/db/auth/verification-token"
import { SignInPayload, SignInSchema } from "@/schema/auth/signin"
import { AuthError } from "next-auth"

export const login = async (data: SignInPayload) => {
  const validatedFields = SignInSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      error: "Invalid Login Request",
    }
  }

  const { email, password } = validatedFields.data
  const formattedEmail = email.toLowerCase()

  const existingUser = await getUserByEmail(formattedEmail)

  if (!existingUser) {
    return {
      error: "Email is not linked to any account",
    }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(formattedEmail)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )
    return {
      error: `User has yet to been verified . Sending confirmation email to ${formattedEmail}`,
    }
  }

  if (existingUser.isOauth) {
    return { error: "User is registered under another provider" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return {
      success: "Successfully logged in",
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" }
        default:
          return {
            error: "Something went wrong",
          }
      }
    }
    throw error
  }
}
