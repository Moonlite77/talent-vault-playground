import FirstNameMainForm from "@/app/components/mainFormComponents/firstNameForm/firstNameMainForm"

async function printHi(){
  'use server'
  console.log("Hi")
}

export default function Home() {

  return (
    <div>
      Please login (or create an account/wallet) to proceed.
    </div>
  );
}
