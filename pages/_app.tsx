import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from "@mantine/core";
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
      <>
          <Head>
              <title>ISF Poängjakt</title>
              <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          </Head>
          <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                  /** Put your mantine theme override here */
                  colorScheme: 'light',
              }}
          >
              <SessionProvider session={session}>
                  <Component {...pageProps} />
              </SessionProvider>
          </MantineProvider>
      </>
  )
}

export default MyApp
