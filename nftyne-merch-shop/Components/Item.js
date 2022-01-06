import React from 'react'
import { Flex, Image, NumberInput, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, Button } from "@chakra-ui/react"
export default function Item() {
    return (
        <Flex marginBottom="5%" marginTop="5%"  width="100%" direction="row" justifyContent="space-between">
            <Image height="auto" width="auto" maxHeight="200px" maxWidth="200px" src="/waterBottle.jpg" />
            <Flex width="50%" direction="column" alignItems="center" justifyContent="center" height="auto">
                <NumberInput defaultValue={0} min={0} max={10}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Button marginTop="5%" colorScheme="blue">Add to cart</Button>
            </Flex>
           
        </Flex>
    )
}
