import { Flex, Heading } from "@chakra-ui/react";
import NonClothes from "../Components/NonClothes";
import React, { useEffect, useState, } from "react";
import Clothes from "../Components/Clothes";
import Buying from "../Components/Buying";
import { ReactDOM } from "react";

export default function Home() {
  const [loadedItems, updateLoadedItems] = useState(false);
  const [cart, updateCart] = useState(0);
  const [items, updateItems] = useState([])
  const [names, updateNames] = useState([])
  const [clothes, updateClothes] = useState()
  const [nonClothes, updateNonClothes] = useState()
  const [buying, updateBuying] = useState(false)
  const [totals, updateTotals] = useState([])
  
let counter = 0 
const addToCart = (n, str,size,price) => {
    return new Promise((res, rej) => {
      return res()
    }).then(() => {
      counter++
      updateCart(counter);  
      let j = items
      j.push([n,size])
      updateItems(j)
    
  let  k = names
      k.push([str,price])
      updateNames(k)
    })
  }
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
      const c =  Object.keys(data.clothes).map((key,index) =>{
          return <Clothes key={index} max={3} name={key} update={addToCart} price={data.clothes[key].sm[1]} sm={data.clothes[key].sm[0]} md={data.clothes[key].md[0]} lg={data.clothes[key].lg[0]} xl={data.clothes[key].xl[0]} img="/waterBottle.jpg" />
        })
        updateClothes(c)
        const nc = Object.keys(data.nonClothes).map((key,index) =>{
          return <NonClothes key={index} max={3} price={data.nonClothes[key][1]} name={key} update={addToCart} img="/waterBottle.jpg"/>
        })
        updateNonClothes(nc)
        updateLoadedItems(true)
      });
  }, []);
const toggleBuying = () =>{
  if(buying) updateBuying(false)
  if(!buying && loadedItems)
  {
    let s = 0
    let i = 0
    names.forEach((name)=>{
      s += name[1] * items[i][0]
      i++
    })
    let m = 0
    items.forEach((item)=>{
      m += item[0]
    })
    updateTotals([s,m])
    updateBuying(true)
  }

}

 
  return (
    <Flex alignItems="center" justifyContent="center">

      <Flex direction="column">
        <Flex marginTop="3%" width="100%" direction="column" justifyContent="space-evenly">
          <Heading size="4xl">NFTY-NE Merch Shop</Heading>
          <Flex direction="row"  width="100%" onClick={()=>toggleBuying()}>
            <Heading cursor="pointer">Cart ({cart})</Heading>
            {!buying && <Heading cursor="pointer" ml="8%">Purchase</Heading>}
            {buying && <Heading cursor="pointer" ml="8%">Back to shop</Heading>}
          </Flex>
          
        </Flex>
        {!buying &&(<>
        
        <Flex direction="column" alignItems="center">
          {!loadedItems && (
            <Heading>Loading...</Heading>
          )}
          {loadedItems && (
            <>
              {clothes}
              {nonClothes}
            </>
          )}
        </Flex>
        
        
        </>)}
        {buying &&(<Buying names={names} items={items} data={totals} />)}
      </Flex>


    </Flex>
  );
}
