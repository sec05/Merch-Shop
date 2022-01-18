import { ChakraProvider } from '@chakra-ui/react'
import "../styles/globals.css"
import Script from 'next/script'
import theme from '../Components/theme'
function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider theme={theme} >
     <title>NFTY-NE Merch Shop</title>
     <Component {...pageProps} />
   

    </ChakraProvider>
  )
}
export default MyApp