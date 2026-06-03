import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Retrieve the plan details passed from the GetStarted page.
  const { plan } = location.state || {}; 

  // If a user navigates to this page directly without a plan, redirect them to the selection page.
  React.useEffect(() => {
    if (!plan) {
      navigate('/get-started');
    }
  }, [plan, navigate]);

  // State for handling payment form inputs.
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [discountCode, setDiscountCode] = useState('');

  // Calculate prices. Default to 0 if the plan is not yet loaded.
  const price = plan ? parseFloat(plan.price.replace('$', '')) : 0;
  const taxes = 50.00; // Fixed tax amount.
  const discount = 0.00; // Placeholder for discount logic.
  const total = price + taxes - discount;

  /**
   * Simulates a payment processing flow.
   * Validates form inputs, logs payment details, shows a confirmation,
   * and redirects the user to the home page upon "successful" payment.
   */
  const handlePayment = () => {
    if (!cardholderName || !cardNumber || !expiry || !cvc) {
      alert('Please fill in all required fields.');
      return;
    }
    
    const paymentDetails = {
      plan: plan.name,
      total: total.toFixed(2),
      cardholderName,
    };

    console.log('Processing payment:', paymentDetails);
    alert('Payment successful!');
    navigate('/'); // Redirect to home page after successful payment
  };

  // Render nothing or a loading spinner while waiting for the redirect to trigger.
  if (!plan) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-[#0d1126] text-white flex items-center justify-center p-4 pt-28">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left side: Payment Form */}
        <div className="bg-[#1a1f3a] p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-2">Let's Make Payment</h1>
          <p className="text-gray-400 mb-8">
            To start your subscription, input your card details to make payment. You will be redirected to your banks authorization page.
          </p>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-300 mb-2">Cardholder's Name</label>
              <input 
                type="text" 
                id="cardholderName"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className="w-full bg-[#2c324c] border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400" 
                placeholder="Elina Markson"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-[#2c324c] border border-gray-600 rounded-lg p-3 pl-12 text-white placeholder-gray-400" 
                  placeholder="9870 3456 7890 6473"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="mastercard" className="h-6 w-6"/>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-300 mb-2">Expiry</label>
                <input 
                  type="text" 
                  id="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-[#2c324c] border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400" 
                  placeholder="MM / YY"
                />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-300 mb-2">CVC</label>
                <input 
                  type="text" 
                  id="cvc" 
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="w-full bg-[#2c324c] border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400" 
                  placeholder="CVC"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="discountCode" className="block text-sm font-medium text-gray-300 mb-2">Discount Code</label>
              <div className="flex">
                <input 
                  type="text" 
                  id="discountCode"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="w-full bg-[#2c324c] border border-gray-600 rounded-l-lg p-3 text-white placeholder-gray-400" 
                  placeholder="CHIKAMSO-20-OFF"
                />
                <button type="button" className="bg-[#2c324c] border border-gray-600 border-l-0 rounded-r-lg px-4 text-[#8a5cf6] font-semibold">Apply</button>
              </div>
            </div>
            
            <button type="button" onClick={handlePayment} className="w-full bg-gradient-to-r from-[#8a5cf6] to-[#6d28d9] text-white font-bold py-3 rounded-lg">
              Pay
            </button>
          </form>
        </div>
        
        {/* Right side: Payment Summary */}
        <div className="bg-gradient-to-br from-[#1e1e4b] to-[#2c2c6c] p-8 rounded-2xl flex flex-col">
          <h2 className="text-lg font-medium text-gray-300 mb-2">You're paying,</h2>
          <p className="text-5xl font-extrabold mb-6">${total.toFixed(2)}</p>
          
          <div className="space-y-4 text-gray-300 flex-grow">
            <div className="flex justify-between">
              <span>{plan.name} Plan</span>
              <span className="font-medium text-white">${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Other Taxes</span>
              <span className="font-medium text-white">${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discounts & Offers</span>
              <span className="font-medium text-white">${discount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-600 my-6"></div>
          
          <div className="space-y-4">
            <div className="flex justify-between font-medium">
              <span>Sub Total :</span>
              <span>${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl">
              <span>Total :</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button onClick={handlePayment} className="w-full bg-gradient-to-r from-[#8a5cf6] to-[#6d28d9] text-white font-bold py-3 rounded-lg mt-8">
            Pay via Card
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage; 