"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ConnectButton } from "thirdweb/react"
import { Menu, X } from "lucide-react"
import { client } from "./thirdwebComponents/client"
import next from "@/public/next.svg"
import { logout } from "@/app/actions/login"

interface NavBarProps {
  isLoggedIn: boolean
}

export default function NavBar({ isLoggedIn }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    await logout()
    // You might want to add some client-side logic here, like refreshing the page or updating state
    window.location.href = "/" // Redirect to home page after logout
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <Image src={next || "/placeholder.svg"} alt="TalentVault" width={32} height={32} />
          </Link>
          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex items-baseline space-x-4">
              <Link href="/" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    href="/onboard"
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Onboard
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            {!isLoggedIn && (
              <ConnectButton
                client={client}
                appMetadata={{
                  name: "TalentVaultPlayground",
                  url: "https://talentvault.com",
                }}
              />
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/onboard"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Onboard
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
          {!isLoggedIn && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <ConnectButton
                client={client}
                appMetadata={{
                  name: "TalentVaultPlayground",
                  url: "https://talentvault.com",
                }}
              />
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

