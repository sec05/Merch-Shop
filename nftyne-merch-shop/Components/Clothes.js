import React, { useState, useEffect } from 'react'
import { Flex, Image, NumberInput, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, Button, Heading, Select } from "@chakra-ui/react"
export default function Clothes(props) {
    /*
    props:
    max: int
    name: str
    update: func
    img: str
    sm: int
    md: int
    lg: int
    xl: int
    */
    const [amount, updateAmount] = useState(0)
    const [max, updateMax] = useState()
    const sizes ={
        sm: props.sm,
        md: props.md,
        lg: props.lg,
        xl: props.xl,
    }
    const [inStock, updateInStock] = useState({
        sm: sizes.sm == 0,
        md: sizes.md == 0,
        lg: sizes.lg == 0,
        xl: sizes.xl == 0,

    })
    useEffect(() => {
        updateMax(props.max)
    })
    const onSubmit = () => {
        if (amount == 0) return
        const size = document.getElementById(props.name+" sizes").value 
        if( amount > sizes[size])
        {
            window.alert("You've selected too many"+props.name+" product!")
        }
        props.update(amount, props.name, size, props.price)

    }
    return (
        <Flex marginBottom="5%" marginTop="5%" width="100%" direction="row" justifyContent="space-between">
            <Image height="auto" width="auto" maxHeight="200px" maxWidth="200px" src={props.img} alt={props.name + " image"} />
            <Flex direction="column" width="75%" >

                <Heading>{props.name}</Heading>

                <Flex width="100%" direction="row" alignItems="center" justifyContent="start" height="100%">
                    <NumberInput width="25%" defaultValue={amount} min={0} max={max} onChange={(str) => updateAmount(parseInt(str))}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Select ml="8%" placeholder=''  width="25%" id={props.name + " sizes"}>
                    <option value="" disabled></option>
                        <option value='sm'disabled={inStock.sm}>sm</option>
                        <option value='md' disabled={inStock.md}>md</option>
                        <option value='lg' disabled={inStock.lg}>lg</option>
                        <option value="xl" disabled={inStock.xl}>xl</option>
                    </Select>
                    <Button onClick={() => onSubmit()} marginLeft="8%" colorScheme="blue">Add to cart</Button>
                </Flex>
            </Flex>


        </Flex>
    )
}
