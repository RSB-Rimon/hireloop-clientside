import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/app/lib/auth"

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL as string,
  plugins: [inferAdditionalFields<typeof auth.options>()],
})
export const { signIn, signUp, signOut, useSession } = authClient