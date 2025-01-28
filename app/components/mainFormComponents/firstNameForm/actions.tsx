'use server'

import { z } from "zod";

const firstNameSchema = z.string().min(2, {message:"must have at least 2 characters"}).max(10, {message: "Name must be less than 10 characters"});

export async function submitFirstName(prevState: any, formData: FormData){
    const firstName: any = formData.get("firstName")

    if(firstName){
      const userFirstNameObject = firstNameSchema.safeParse(firstName)
      if (userFirstNameObject.success) {
        //update database
        return { success: true, data: userFirstNameObject.data, message: "" }
      } else {
        return { success: false, message: userFirstNameObject.error.errors[0].message, data: "" }
      }
    } else {
      return { success: false, message: "Please enter a name." }
    }

  }