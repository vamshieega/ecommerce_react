import axios from "axios";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const KEY =
  "pk_test_51KEbRkSCeUnpNNi2G23lU7VjCow082poarm0bbemGT9wglleydGwnllK2369LdpOkTJ0wJzNgADuPbqqHtjHfnXG009ez59ZCE";
const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    console.log(token);
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 200,
          }
        );
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StripeCheckout
        name="Eega Shop"
        image="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png"
        billingAddress
        shippingAddress
        description="total 200"
        amount={200}
        token={onToken}
        stripeKey={KEY}
      >
        <button>pay now</button>
      </StripeCheckout>
    </div>
  );
};

export default Pay;
