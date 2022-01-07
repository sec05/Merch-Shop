import {
    Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Center, FormControl,
    FormLabel,
    FormErrorMessage,
    Input, Button, Heading
} from "@chakra-ui/react";
import React, { useEffect, useState, } from "react";
import Payment from "./Payment"
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
    const [address, setAddress] = useState('')
    const [paying, setPaying] = useState(false)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleNameChange = (e) => setName(e.target.value)
    const handleAddressChange = (e) => setAddress(e.target.value)

    const isEmailError = email === ''
    const isNameError = name === ''
    const isAddressError = address === ''
    const togglePaying = () => {
        if (paying) setPaying(false)
        else setPaying(true)
    }
    const proceedToPayment = () => {
        console.log(isEmailError)
        if (!isAddressError && !isEmailError && !isNameError) {
            togglePaying()
        }
        else {
            window.alert("Please fill out shipping completely before continuing!")
        }
    }
    useEffect(() => {

        let i = 0;
        const s = () => names.map((name) => {
            i++


            return <Tr key={i}>
                <Td>{name[0]}</Td>
                <Td>{items[i - 1][1]}</Td>
                <Td><Center>{items[i - 1][0]}</Center></Td>
                <Td><Center>{items[i - 1][0] * name[1]}</Center></Td>
                <Td><Button colorScheme="red">Remove</Button></Td>
            </Tr>
        })
        updateSummary(s)

    }, [])




    return (
        <Flex direction="column">
            {!paying && (
                <>
                    <Table>
                        <TableCaption color="black" fontSize="150%">You are buying {props.data[1]} items for ${props.data[0]}</TableCaption>
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
                    <Heading> Shipping </Heading>
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

                    <FormControl isInvalid={isAddressError}>
                        <FormLabel htmlFor='email'>Full Address (Number, Street, Town, State,Zipcode)</FormLabel>
                        <Input id='address' type='text' value={address} onChange={handleAddressChange} />
                        {!isAddressError ? (
                            <></>
                        ) : (
                            <FormErrorMessage>Address is required.</FormErrorMessage>
                        )}
                    </FormControl>

                    <Button mt="5%" colorScheme="blue" onClick={() => proceedToPayment()}>Proceed to payment</Button>
                </>
            )}
    {paying &&(
        <Payment price={props.data[0]} />
    )}

        </Flex>
    )
}
