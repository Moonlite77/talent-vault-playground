import { ThirdwebProvider } from "thirdweb/react"
import { isLoggedIn } from "@/app/actions/login"
import NavBar from "@/app/components/navbar"
import type React from "react"
import "@/app/globals.css" // Make sure this import is present

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const loggedIn = await isLoggedIn()

  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThirdwebProvider>
          <div className="relative flex min-h-screen flex-col">
            <NavBar isLoggedIn={loggedIn} />
            <div className="flex-1">
              <main>{children}</main>
            </div>
          </div>
        </ThirdwebProvider>
      </body>
    </html>
  )
}

