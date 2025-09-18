"use client"

import { useState, useEffect } from 'react';

import { Check, Package, Truck, Mail, Phone, ArrowRight } from 'lucide-react';

// Define a type for the order data we expect from the backend
interface OrderData {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  orderNumber: string;
  orderDate: string;
  total: string;
  productName: string;
  productDescription: string;
}

const OrderConfirmed = () => {
  // --- ❌ REPLACED --- The useSearchParams hook is removed from here.

  // State to hold our order data, loading status, and any errors
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect runs once when the component loads to fetch the data
  useEffect(() => {
    // --- ✅ MODIFIED --- We now get the sessionId inside useEffect using standard browser APIs
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      fetch(`http://localhost:4242/order-details?session_id=${sessionId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Could not fetch order details.');
          }
          return res.json();
        })
        .then((data: OrderData) => {
          setOrderData(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setError("No session ID found. Cannot display order.");
      setIsLoading(false);
    }
  }, []); // The effect now runs only once when the component mounts

  // Display a loading message while fetching
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading your order details...</div>;
  }

  // Display an error message if something went wrong
  if (error || !orderData) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error || "Order data is missing."}</div>;
  }

  // Once data is loaded, display the page with real data
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h1 className="text-3xl sm:text-5xl font-light text-gray-900 mt-6 mb-4 tracking-tight">Order Confirmed</h1>
            <p className="text-base sm:text-xl text-gray-600 font-light max-w-2xl mx-auto">Thank you, {orderData.customerName}! Your order is complete.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 mb-8 md:mb-16">
            <div className="lg:col-span-3 space-y-8">
              {/* Order Summary with Dynamic Data */}
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <Package className="w-6 h-6 text-gray-700" />
                  <h2 className="text-2xl font-medium text-gray-900">Order Summary</h2>
                </div>
                <div className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Order Number</p>
                      <p className="font-mono text-lg font-medium text-gray-900 break-all">{orderData.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Order Date</p>
                      <p className="text-lg text-gray-900">{orderData.orderDate}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-8">
                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold text-lg mb-3">{orderData.productName}</p>
                        <p className="text-base text-gray-600">{orderData.productDescription}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-gray-500 mb-1">Quantity</p>
                          <p className="text-lg font-semibold">1</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Total</p>
                          <p className="text-lg font-semibold">${orderData.total}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information with Dynamic Data */}
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <Truck className="w-6 h-6 text-gray-700" />
                  <h2 className="text-2xl font-medium text-gray-900">Delivery Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-3">Shipping Address</p>
                    <div className="text-lg space-y-1">
                      <p className="font-medium">{orderData.customerName}</p>
                      <p>{orderData.shippingAddress}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-3">Estimated Delivery</p>
                      <p className="text-2xl font-semibold text-emerald-600">September 18, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-3">Contact</p>
                      <p className="text-lg break-all">{orderData.customerEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Next Steps (this part can remain static) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl p-8 border border-emerald-200/50 text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-emerald-900 mb-3">Payment Confirmed</h3>
                <p className="text-base text-emerald-700">Your order is being processed</p>
              </div>
              {/* ... other static sections like 'What happens next' and 'Support' can go here */}
            </div>
          </div>
          {/* ... other static sections like 'Inspirational Message' and 'Action Buttons' can go here */}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;