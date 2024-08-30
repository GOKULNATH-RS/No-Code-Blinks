import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localfont from 'next/font/local'
import './globals.css'

import { AppDataContextProvider } from '@/context/AppDataContext'
import { FormDataContextProvider } from '@/context/FormContext'
import Head from 'next/head'

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
      <Head>
        <title>BlinksEasy</title>
        <meta property='og:title' content='BlinksEasy' />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://blinkseasy.gokulnathrs.tech/'
        />
        <meta
          property='og:image'
          content='https://blinkseasy.gokulnathrs.tech/_next/static/media/BlinksEasy.f68b048e.svg'
        />
        <meta
          property='og:description'
          content='Generate Blinks with few clicks'
        />
        <meta property='og:site_name' content='BlinksEasy' />
        <meta property='og:locale' content='en_US' />

        <meta
          name='description'
          content='BlinksEasy allows you to generate Blinks with few clicks.'
        />
      </Head>
      <body className={`${inter.className} ${powerGrotesk.variable}`}>
        <AppDataContextProvider>
          <FormDataContextProvider>{children}</FormDataContextProvider>
        </AppDataContextProvider>
      </body>
    </html>
  )
}
