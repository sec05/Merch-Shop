import { Divider, Flex, Image, Heading } from "@chakra-ui/react";
import Item from "../Components/Item";
import Head from "next/head";
import { useEffect, useState } from "react";
export default function Home() {
  const [loadedItems, updateLoadedItems] = useState(false);
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        updateLoadedItems(true)
      });
  });
  return (
    <Flex alignItems="center" justifyContent="center">
      <Head>
        <title>NFTY-NE Merch</title>
      </Head>
      
      <Flex direction="column">
        <Flex marginTop="3%" direction="column" alignItems="center">
          <Heading size="4xl">NFTY-NE Merch Shop</Heading>
        </Flex>
        <Flex direction="column" alignItems="center">
         {!loadedItems && (
           <Heading>Loading...</Heading>
         )}
         {loadedItems && (
           <>
           <Item />
           <Divider height="5%" orientation='horizontal' /></>
         )}
        </Flex>
      </Flex>
      <Flex direction="column" alignItems="center" width="15%">
          <Heading>Cart</Heading>
          <Divider />
      </Flex>
    </Flex>
  );
}
