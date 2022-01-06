import { Flex, Image, Heading } from "@chakra-ui/react"
import Head from 'next/head'
export default function Home() {
  return (
   <Flex alignItems="center" justifyContent="center">
     <Head>
       <title>NFTY-NE Merch</title>
     </Head>
      <Flex marginTop="3%" direction="column" alignItems="center" width="60vw" height="55vh">
      <Heading size="4xl">NFTY-NE Merch Shop</Heading>
      </Flex>
   </Flex>
  )
}
