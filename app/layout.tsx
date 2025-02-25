import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localfont from 'next/font/local'
import './globals.css'

import { AppDataContextProvider } from '@/context/AppDataContext'
import { FormDataContextProvider } from '@/context/FormContext'
import AppWalletProvider from '@/components/AppWalletProvider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

const powerGrotesk = localfont({
  src: [
    {
      path: '../public/fonts/PowerGrotesk-Regular.ttf',
      weight: '400'
    }
  ],
  variable: '--font-powerGrotesk'
})

export const metadata: Metadata = {
  title: 'Blinks Easy',
  description: 'Generate your own blinks in an instant'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${powerGrotesk.variable}`}>
        <AppWalletProvider>
          <AppDataContextProvider>
            <FormDataContextProvider>
              {children}
              <Toaster />
            </FormDataContextProvider>
          </AppDataContextProvider>
        </AppWalletProvider>
      </body>
    </html>
  )
}
