import { Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState, } from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function Payment(props) {
    const [paid, setPaid] = useState(true)
    /*
    props
    amount []
    items []
    price
    userInfo []
    */ 
    useEffect(() => {
     
    }, [paid,props.price])
    return (
        <Flex direction="column" >
            {!paid && (<>

                <Heading width="100%" mt="5%" size="lg">Purchase here</Heading>
              <PayPalButton amount={props.price}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
            setPaid(true)
            return fetch("/api/updateMasterSheet",{method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(null)})
        }}
        options={{
          clientId: "AWMS0m2gltZbBvzVdN2hIvoURpM_Eae282TqcBY6eqLrAuqh01VStBtGSqxg0NcIHo7XdKVk1fVAOz7M"
        }} onError={(err)=>alert(err)} />

            </>

            )}
            {paid && (
               <>
       
                <Heading wordBreak="break-word" width="100%" size="lg" mt="5%"> Thank you for your purchase, you will be sent an email confirmation shortly. If you have any questions or concerns please reach out ne-mfvp@nfty.org</Heading>
               </>
            )}

        </Flex>
    )
}
