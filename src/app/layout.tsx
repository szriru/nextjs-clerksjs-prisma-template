import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import MyNavbar from '@/components/MyNavbar'

export const metadata = {
  title: 'Nextjs-clerkjs-prisma-template',
  description: 'text post site template built with nextjs clerkjs prisma',
}

// revalidate this page every 30 seconds
export const revalidate = 30

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="">
          <>
            <MyNavbar />
            {children}
          </>
        </body>
      </html>
    </ClerkProvider>
  )
}
