import { ChakraProvider, ThemeProvider, ColorModeProvider } from '@chakra-ui/react'
import "../styles/globals.css"
import Script from 'next/script'
import theme from './theme'
function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider theme={theme} >
      <Script src="https://www.paypal.com/sdk/js?client-id=AWMS0m2gltZbBvzVdN2hIvoURpM_Eae282TqcBY6eqLrAuqh01VStBtGSqxg0NcIHo7XdKVk1fVAOz7M&currency=USD"></Script>
     <Component {...pageProps} />
   

    </ChakraProvider>
  )
}
export default MyApp