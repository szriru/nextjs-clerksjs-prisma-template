'use client'
//some packages from flobite-react using flushSync from react-dom.
import { Navbar } from 'flowbite-react'
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconSleep } from './Icons'

const IsLoggedIn = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="btn">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
    </>
  )
}

const MyNavbar = () => {
  const pathname = usePathname()

  return (
    <Navbar
      fluid={true}
      rounded={true}
    >
      <Link className='flex gap-1' href="/">
        <IconSleep className="w-10 h-10" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Site Name
        </span>
      </Link>
      <div className="flex md:order-2 items-center">
        <Link className='mr-4 rounded-md bg-blue-500 p-1 text-white' href="/post/new">+POST</Link>
        <IsLoggedIn />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          active={pathname == "/"}
        >
          Home
        </Navbar.Link>
        <Navbar.Link href="/about" active={pathname == "/about"}>
          About
        </Navbar.Link>
        <Navbar.Link href="/contact" active={pathname == "/contact"}>
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavbar