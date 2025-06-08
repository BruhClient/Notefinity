"use server"
import { VerificationCodeEmail } from "@/components/email_templates/PasswordResetTemplate"
import { VerificationEmail } from "@/components/email_templates/VerificationTemplate"
import { env } from "@/data/env/server"
import { Resend } from "resend"

const resend = new Resend(env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_VERCEL_URL

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/account-verification/${token}`

  await resend.emails.send({
    from: "mail@quizpdf.net",
    to: email,
    subject: "Confirm your email",
    react: VerificationEmail({ verificationUrl: confirmLink }),
  })
}

export const sendPasswordResetEmail = async (email: string, code: string) => {
  await resend.emails.send({
    from: "mail@quizpdf.net",
    to: email,
    subject: "Password Reset Code",
    react: VerificationCodeEmail({ code }),
  })
}
