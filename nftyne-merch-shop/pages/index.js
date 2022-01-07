import { Flex, Heading } from "@chakra-ui/react";
import Item from "../Components/Item";
import { useEffect, useState, } from "react";



export default function Home() {
  const [loadedItems, updateLoadedItems] = useState(false);
  const [cart, updateCart] = useState(0);
  const [items, updateItems] = useState([])
  const [names, updateNames] = useState([])
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        updateLoadedItems(true)
      });
  });


  const addToCart = (n,str)=>{
    return new Promise((res, rej)=>{
      return res()
     
    }).then(()=>{
      let m = cart + 1
      updateCart(m);
    }).then(()=>{ 
      let m = items
      m.push(n)
      updateItems(m)

      m = names
      m.push(str)
      updateNames(m)

  })
}
  return (
    <Flex alignItems="center"  justifyContent="center">
      
      <Flex direction="column">
        <Flex marginTop="3%" width="100%"  direction="column" justifyContent="space-evenly">
          <Heading size="4xl">NFTY-NE Merch Shop</Heading>
            <Heading cursor="pointer" >Cart ({cart})</Heading>
        </Flex>
        <Flex direction="column" alignItems="center">
         {!loadedItems && (
           <Heading>Loading...</Heading>
         )}
         {loadedItems && (
           <>
           <Item max={9} name="water bottle" update={addToCart} />
           </>
         )}
        </Flex>
      </Flex>    
      
      
    </Flex>
  );
}
