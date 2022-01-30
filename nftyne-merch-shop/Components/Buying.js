import {
    Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Center, FormControl,
    FormLabel,
    FormErrorMessage,
    Input, Button, Heading
} from "@chakra-ui/react";
import React, { useEffect, useState, } from "react";
import Payment from "./Payment"
import data from "../key.json"
/* 
props
names = [[str,price]]
items = [[amt,size]] if(size == "n/a") == non clothes
data = data obj
*/
export default function Buying(props) {
    const [summary, updateSummary] = useState()
    let names = props.names
    let items = props.items
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [paying, setPaying] = useState(false)
    const [totalAmt, setTotalAmt] = useState(props.data[1])
    const [totalPrice, setTotalPrice] = useState(props.data[0])
    const [postObj, setPostObj] = useState({})
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleNameChange = (e) => setName(e.target.value)

    const isEmailError = email === ''
    const isNameError = name === ''
    const togglePaying = () => {
        if (paying) setPaying(false)
        else setPaying(true)
    }
    const proceedToPayment = () => {
        if (!isEmailError && !isNameError && totalPrice > 0) {
            document.body.style.cursor = "wait";
            var p = {
                key: data.API_key,
                clothes: {

                },
                nonClothes: {

                }
            }
            for (let i = 0; i < names.length; i++) {
                if (items[i][1] !== null) {
                    if (p.clothes[names[i][0]] === undefined) {
                        p.clothes[names[i][0]] = items[i];
                    }
                    else {
                        p.clothes[names[i][0]][0] += items[i][0];
                    }
                }
                else {
                    if (p.nonClothes[names[i][0]] === undefined) {
                        p.nonClothes[names[i][0]] = items[i];
                    }
                    else {
                        p.nonClothes[names[i][0]][0] += items[i][0];
                    }
                }
            }
            setPostObj(p)

            fetch("/api/validateItems", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postObj)
            }).then((res) => res.json())
                .then((data) => {
                    if (data.length != 0) {
                        let str = ''
                        for (let i = 0; i < data.length; i++) {
                            str += data[i] + (i === data.length - 1 ? "" : ", ")
                        }
                        window.alert("You have selected too many of " + str + "! Please remove them from your cart!")
                    }
                    else {
                        togglePaying()
                    }
                })

        }
        else {
            window.alert("Please fill out shipping completely before continuing!")
        }
        document.body.style.cursor = "pointer";
    }
    const s = (i) => names.map((name) => {
        i++


        return <Tr key={i}>
            <Td>{name[0]}</Td>
            <Td>{items[i - 1][1]}</Td>
            <Td><Center>{items[i - 1][0]}</Center></Td>
            <Td><Center>{items[i - 1][0] * name[1]}</Center></Td>
            <Td><Button colorScheme="red" onClick={() => removeItem(i - 1)}>Remove</Button></Td>
        </Tr>
    })
    const removeItem = (index) => {
        props.updateCart(names.length - 1)
        let i = 0;
        let amt = props.data[1] - items[index][0]
        props.data[1] = amt
        props.data[0] = props.data[0] - (names[index][1] * items[index][0])
        if (index > -1) {
            names.splice(index, 1);
            items.splice(index, 1)
        }
        updateSummary(s(i))
        setTotalAmt(amt)
        setTotalPrice(props.data[0])
    }
    useEffect(() => {
        updateSummary(s(0))
    }, [])




    return (
        <Flex direction="column">
            {!paying && (
                <>
                    <Table>
                        <TableCaption color="black" fontSize="150%">You are reserving {totalAmt} items costing ${totalPrice}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Item</Th>
                                <Th>Size</Th>
                                <Th isNumeric>Amount</Th>
                                <Th isNumeric>Price</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {summary}
                           
                        </Tbody>

                    </Table>
                    <Heading> Info </Heading>
                    <FormControl isInvalid={isNameError}>
                        <FormLabel htmlFor='email'>Name</FormLabel>
                        <Input id='name' type='text' value={name} onChange={handleNameChange} />
                        {!isNameError ? (
                            <></>
                        ) : (
                            <FormErrorMessage>Name is required.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={isEmailError}>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input id='email' type='email' value={email} onChange={handleEmailChange} />
                        {!isEmailError ? (
                            <></>
                        ) : (
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        )}
                    </FormControl>

                  

                    <Button mt="5%" mb="5%" colorScheme="blue" onClick={() => proceedToPayment()}>Reserve </Button>
                </>
            )}
            {paying && (
                <Payment postObj={postObj} />
            )}

        </Flex>
    )
}
