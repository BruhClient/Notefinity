import { createEnv } from "@t3-oss/env-nextjs"

import { z } from "zod"

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    AUTH_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    AUTH_DRIZZLE_URL: z.string(),
    UPLOADTHING_TOKEN:z.string(),
    PINECONE_API_KEY:z.string(), 
    OPENAI_API_KEY:z.string(),
    STRIPE_PUBLIC_KEY : z.string(), 
    STRIPE_SECRET_KEY:z.string(),
    STRIPE_WEBHOOK_SECRET:z.string(), 
  },
  experimental__runtimeEnv: process.env,
})