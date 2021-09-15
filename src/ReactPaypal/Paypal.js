import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2'

export default function Paypal() {
  const clientId = "ATkWUjR12NycFpXnPYwVJHsf2FzUtNNtx9gm6bzODyfX_wnhbrUHZAA_1CTdJ7n55uCkd-JddLBgltrW"
  return (
    <div>
      <PayPalButton
        amount="0.01"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
        }}
        options={{
          clientId
        }}
      />

    </div>
  )
}
