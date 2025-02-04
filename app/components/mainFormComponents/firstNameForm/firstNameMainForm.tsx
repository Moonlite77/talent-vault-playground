"use client"

import { useActionState } from "react"
import { submitFirstName } from "./actions"

interface FormState {
  success: boolean
  message: string
  data?: string
}

export default function FirstNameMainForm() {
  const initialState: FormState = {
    success: false,
    message: "",
    data: undefined,
  }

  const [state, action, isPending] = useActionState(submitFirstName, initialState)

  return (
    <form action={action}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        className="border border-gray-300 rounded-md p-2 focus:outline-none"
      />
      {isPending && <p>Submitting...</p>}
      {!isPending && state.success && state.data && (
        <p className="text-green-600">Successfully submitted: {state.data}</p>
      )}
      {!isPending && !state.success && state.message && <p className="text-red-600">{state.message}</p>}
    </form>
  )
}

