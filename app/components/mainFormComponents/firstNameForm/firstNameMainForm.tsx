'use client'
import { useActionState } from "react"
import { submitFirstName } from "./actions"

export default function FirstNameMainForm(){
const initialState: any = {
    success: false,
    message: '',
    data: '',
}
    
const[state, action, isPending] = useActionState(submitFirstName, initialState)

return(
    <form action={action}>
        <input type="text" name="firstName" placeholder="First Name" className="border border-gray-300 rounded-md p-2 focus:outline-none ">
        </input>
        {state.success && <p className="text-green-600">{state.data}</p>}
        {!state.success && <p className="text-red-600">{state.message}</p>}
    </form>
)
}

