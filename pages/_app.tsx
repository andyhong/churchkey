import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { Provider as AuthProvider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import theme from '../styles/theme'
import fonts from '../styles/fonts'

const customTheme = extendTheme(theme)

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient()

  return (
    <AuthProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={customTheme}>
          <Global styles={fonts} />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
