'use client'

import { Providers } from '@/components/Providers'
import { Header } from '@/components/common/Header/Header'
import { Footer } from '@/components/common/Footer/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}