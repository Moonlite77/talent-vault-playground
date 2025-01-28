'use server'

export async function submitFirstName(prevState: any, formData: FormData){
    const firstName: any = formData.get("firstName")

    if(firstName){
      return { success: true, message: `Hi, ${firstName}!` }
    } else {
      return { success: false, message: "Please enter a name." }
    }

  }