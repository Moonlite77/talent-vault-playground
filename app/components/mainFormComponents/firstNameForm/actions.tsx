"use server"

import { z } from "zod"

const firstNameSchema = z
  .string()
  .min(2, { message: "must have at least 2 characters" })
  .max(10, { message: "Name must be less than 10 characters" })

type FormState = {
  success: boolean
  data?: string
  message: string
}

export async function submitFirstName(prevState: FormState, formData: FormData): Promise<FormState> {
  const firstName = formData.get("firstName")

  if (firstName && typeof firstName === "string") {
    const userFirstNameResult = firstNameSchema.safeParse(firstName)
    if (userFirstNameResult.success) {
      // update database
      return { success: true, data: userFirstNameResult.data, message: "" }
    } else {
      return { success: false, message: userFirstNameResult.error.errors[0].message, data: undefined }
    }
  } else {
    return { success: false, message: "Please enter a name." }
  }
}

