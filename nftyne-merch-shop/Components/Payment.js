import { Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState, } from "react";


export default function Payment(props) {
    /*
    props
    amount []
    items []
    price
    userInfo []
    */ 
    useEffect(() => {
        console.log(props.postObj)
        fetch("/api/validateItems", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        }).then(()=>{})
    })
    return (
        <Flex direction="column" >

           
       
        <Heading wordBreak="break-word" width="100%" size="lg" mt="5%"> Thank you for your purchase, you will be sent an email confirmation shortly. If you have any questions or concerns please reach out ne-mfvp@nfty.org</Heading>
            

        </Flex>
    )
}
