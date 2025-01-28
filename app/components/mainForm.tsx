'use client'
import { useActionState } from "react"
import { submitFirstName } from "../actions"

export default function MainForm(){
const initialState: any = {
    success: false,
    message: '',
}
    
const[state, action, isPending] = useActionState(submitFirstName, initialState)

return(
    <form action={action}>
        <input type="text" name="firstName" placeholder="First Name" className="border border-gray-300 rounded-md p-2 focus:outline-none ">
        </input>
        {state.success && <p className="text-green-600">{state.message}</p>}
        {!state.success && state.message && <p className="text-red-600">{state.message}</p>}
    </form>
)
}

