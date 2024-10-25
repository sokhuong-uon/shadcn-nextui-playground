import { Metadata } from 'next'

import { NextUIProvider } from '@nextui-org/react'

import './globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'A basic Next.js template',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  )
}
