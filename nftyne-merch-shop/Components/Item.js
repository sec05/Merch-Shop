import React, {useState, useEffect} from 'react'
import { Flex, Image, NumberInput, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, Button, Heading, Center, propNames } from "@chakra-ui/react"
export default function Item(props) {
    const [amount, updateAmount] = useState(0)
    const [max, updateMax] = useState()
    useEffect(()=>{
        updateMax(props.max)
    })
    const onSubmit = () =>{
        if(amount == 0) return
        props.update(amount, props.name)
        
    }
    return (
        <Flex marginBottom="5%" marginTop="5%"  width="100%" direction="row" justifyContent="space-between">
            <Image height="auto" width="auto" maxHeight="200px" maxWidth="200px" src="/waterBottle.jpg" />
            <Flex direction="column" width="75%" >
            
                     <Heading>Water Bottle</Heading>
              
                   <Flex width="100%" direction="row" alignItems="center" justifyContent="start" height="100%">
                <NumberInput defaultValue={amount} min={0} max={max} onChange={(str)=>updateAmount(parseInt(str))}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Button onClick={()=>onSubmit()} marginLeft="8%" colorScheme="blue">Add to cart</Button>
            </Flex>
            </Flex>
         
           
        </Flex>
    )
}
