import React from 'react';
// import './App.css';
import axios from 'axios';

function RazorPay() {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
// useEffect(()=>{
//   const Script = document.createElement("script");
//   //id should be same as given to form element
//   const Form = document.getElementById('donateForm');
//   Script.setAttribute('src','your src')
//   Script.setAttribute('data-payment_button_id','your id')
//   Form.appendChild(Script);
// },[])
  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const result = await axios.post('http://localhost:3001/payment/orders');

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }

    const { amount, id: order_id, currency } = result.data;
    console.log(result.data)
    const options = {
      key: 'rzp_live_1z3bLGBd1VLJGM', // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      // name: 'Soumya Corp.',
      description: 'Test Transaction',
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post('/payment/success', data);

        alert(result.data.msg);
      },
      prefill: {
        name: 'Nikhil',
        email: 'example@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Example Corporate Office',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Buy React now!</p>
        <button className='App-link' onClick={displayRazorpay}>
          Pay ₹500
        </button>
      </header>
    </div>
  );
}

export default RazorPay;