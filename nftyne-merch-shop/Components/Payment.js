import { Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState, } from "react";


export default function Payment(props) {
    const [paid, setPaid] = useState(false)
    /*
    props
    amount []
    items []
    price
    userInfo []
    */ 
    useEffect(() => {
        paypal.Buttons({
            try: {
                // Sets up the transaction when a payment button is clicked
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: props.price // Can reference variables or functions. Example: `value: document.getElementById('...').value`
                        }
                    }]
                });
            },

            // Finalize the transaction after payer approval
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (orderData) {
                    // Successful capture! For dev/demo purposes:
                    console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                    var transaction = orderData.purchase_units[0].payments.captures[0];
                    alert('Transaction ' + transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
                    setPaid(true)
                    console.log(paid)
                    // When ready to go live, remove the alert and show a success message within this page. For example:
                    // var element = document.getElementById('paypal-button-container');
                    // element.innerHTML = '';
                    // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                    // Or go to another URL:  actions.redirect('thank_you.html');
                });
            } 
            },
            catch (error) {
                console.log(error)
            }
           
        }).render('#paypal-button-container');
    }, [])
    return (
        <Flex direction="column" justifyContent="center" alignItems="center">
            {!paid && (<>

                <Heading width="100%" mt="5%" size="lg">Purchase here</Heading>
                <div  style={{ marginTop: "5%", width: "100%" }} id="paypal-button-container">

                </div>
            </>

            )}
            {paid && (
               
                <Heading> Thank you for your purchase, you will be sent an email confirmation shortly. If you have any questions or concerns please reach out ne-mfvp@nfty.org</Heading>
               
            )}

        </Flex>
    )
}
