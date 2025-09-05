import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '../contexts/ThemeContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DevOps Environment Toolkit</title>
        <meta name="description" content="One-click setup for your DevOps journey - Get all essential tools installed and configured in minutes!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
