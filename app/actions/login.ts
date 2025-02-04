"use server"

import { type VerifyLoginPayloadParams, createAuth } from "thirdweb/auth"
import { privateKeyToAccount } from "thirdweb/wallets"
import { client } from "@/app/components/thirdwebComponents/client"
import { cookies } from "next/headers"

const privateKey = process.env.AUTH_PRIVATE_KEY || ""

if (!privateKey) {
  throw new Error("Missing AUTH_PRIVATE_KEY in .env file.")
}

const thirdwebAuth = createAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  adminAccount: privateKeyToAccount({ client, privateKey }),
  client: client,
})

export const generatePayload = thirdwebAuth.generatePayload

export async function login(payload: VerifyLoginPayloadParams) {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload)
  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    })
    const cookieStore = cookies()
    cookieStore.set("jwt", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })
    return { success: true }
  }
  return { success: false }
}

export async function isLoggedIn() {
  const cookieStore = cookies()
  const jwt = cookieStore.get("jwt")
  if (!jwt?.value) {
    return false
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value })
  return authResult.valid
}

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete("jwt")
}

