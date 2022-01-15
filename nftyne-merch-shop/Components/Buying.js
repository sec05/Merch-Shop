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
    const [totalAmt, setTotalAmt] = useState(props.data[1])
    const [totalPrice, setTotalPrice] = useState(props.data[0])
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
        if (!isAddressError && !isEmailError && !isNameError) {
            let postObj = {
                clothes:{

                },
                nonClothes:{

                }
            }
            for(let i = 0; i < names.length; i++)
            {
                console.log(postObj)
                if(items[i][1] !== null)
                {
                    if( postObj.clothes[names[i][0]] === undefined)
                    {
                         postObj.clothes[names[i][0]] = items[i];
                    }
                   else
                   {
                    postObj.clothes[names[i][0]][0] += items[i][0];
                   }
                }
                else{
                    if( postObj.nonClothes[names[i][0]] === undefined)
                    {
                         postObj.nonClothes[names[i][0]] = items[i];
                    }
                   else
                   {
                    postObj.nonClothes[names[i][0]][0] += items[i][0];
                   }
                }
            }
            fetch("/api/validateItems", {method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postObj)})
            togglePaying()
        }
        else {
            window.alert("Please fill out shipping completely before continuing!")
        }
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
        props.data[1]--
        let amt = props.data[1] - items[index][0]
        props.data[0] = props.data[0] - (names[index][1] * items[index][0])
        if (index > -1) {
            names.splice(index, 1);
            items.splice(index, 1)
        }
        updateSummary(s(i))
        setTotalAmt(props.data[1])
        setTotalPrice(props.data[0])
        console.log("names "+names)
        console.log("items "+items)
    }
    useEffect(() => {
        updateSummary(s(0))
    }, [])




    return (
        <Flex direction="column">
            {!paying && (
                <>
                    <Table>
                        <TableCaption color="black" fontSize="150%">You are buying {totalAmt} items for ${totalPrice}</TableCaption>
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
            {paying && (
                <Payment price={props.data[0]} />
            )}

        </Flex>
    )
}
