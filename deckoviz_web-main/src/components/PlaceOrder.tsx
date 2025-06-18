"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, Upload } from "lucide-react"

const PlaceOrder: React.FC = () => {
 const [selectedFrameSize, setSelectedFrameSize] = useState("")
 const [selectedFrameType, setSelectedFrameType] = useState("")
 const [customFrameRequest, setCustomFrameRequest] = useState("")
 const [selectedUnits, setSelectedUnits] = useState("")
 const [subscriptionType, setSubscriptionType] = useState("")
 const [subscriptionPeriod, setSubscriptionPeriod] = useState("")
 const [shippingAddress, setShippingAddress] = useState("")
 const [deliveryType, setDeliveryType] = useState("Standard Delivery")
 const [packagingType, setPackagingType] = useState("Standard Packaging")
 const [cardNumber, setCardNumber] = useState("")
 const [expiryDate, setExpiryDate] = useState("")
 const [cvv, setCvv] = useState("")
 const [cardHolderName, setCardHolderName] = useState("")

 const Dropdown: React.FC<{
   value: string
   onChange: (value: string) => void
   placeholder: string
   options: string[]
   className?: string
 }> = ({ value, onChange, placeholder, options, className = "" }) => {
   const [isOpen, setIsOpen] = useState(false)

   return (
     <>
       <div className={`relative ${className}`}>
         <button
           type="button"
           onClick={() => setIsOpen(!isOpen)}
           className="w-full px-4 py-3 text-left bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300 focus:border-blue-300 transition-all duration-200 hover:border-gray-300 flex justify-between items-center"
         >
           <span className={value ? "text-gray-900" : "text-gray-500"}>{value || placeholder}</span>
           <ChevronDown
             className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
           />
         </button>
       </div>
       {isOpen && (
         <>
           {/* Backdrop to close dropdown */}
           <div 
             className="fixed inset-0 z-[9998]" 
             onClick={() => setIsOpen(false)}
           />
           {/* Dropdown menu */}
           <div 
             className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
             style={{
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
               minWidth: '200px',
               maxWidth: '90vw',
               width: 'max-content'
             }}
           >
             {options.map((option) => (
               <button
                 key={option}
                 type="button"
                 onClick={() => {
                   onChange(option)
                   setIsOpen(false)
                 }}
                 className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg whitespace-nowrap"
               >
                 {option}
               </button>
             ))}
           </div>
         </>
       )}
     </>
   )
 }

 return (
   <div className="min-h-screen bg-white relative overflow-hidden">
     {/* Enhanced Creative Gradient Background */}

     {/* Primary flowing gradients - responsive sizes */}
     <div className="absolute inset-0 overflow-hidden">
       {/* Top flowing wave */}
       <div className="absolute -top-40 -left-48 w-[110%] h-60 sm:h-80 bg-gradient-to-r from-pink-300 via-orange-100 to-transparent rounded-full blur-3xl rotate-8"></div>

       {/* Middle diagonal flow */}
       <div className="absolute top-1/4 -right-64 w-[120%] h-48 sm:h-64 bg-gradient-to-l from-orange-100 via-pink-100 to-transparent rounded-full blur-3xl -rotate-[35deg]"></div>

       {/* Bottom wave */}
       <div className="absolute -bottom-32 -left-32 w-[125%] h-60 sm:h-72 bg-gradient-to-r from-purple-200 via-orange-100 to-purple-100 rounded-full blur-3xl rotate-[4deg]"></div>
     </div>

     {/* Secondary accent gradients - responsive sizes */}
     <div className="absolute inset-0">
       {/* Long diagonal streaks */}
       <div className="absolute top-[12%] left-[18%] w-[600px] sm:w-[900px] h-32 sm:h-40 bg-gradient-to-r from-pink-100 to-transparent rounded-full blur-2xl rotate-[28deg] opacity-80"></div>
       <div className="absolute bottom-[65%] right-[25%] w-[700px] sm:w-[1100px] h-36 sm:h-48 bg-gradient-to-l from-purple-200 to-transparent rounded-full blur-2xl -rotate-[42deg] opacity-70"></div>
       <div className="absolute top-[55%] left-[45%] w-[550px] sm:w-[850px] h-28 sm:h-36 bg-gradient-to-r from-orange-100 to-transparent rounded-full blur-2xl rotate-[62deg] opacity-65"></div>

       {/* Wide sweeping gradients */}
       <div className="absolute top-[38%] right-[8%] w-[800px] sm:w-[1200px] h-40 sm:h-52 bg-gradient-to-l from-pink-200 to-transparent rounded-full blur-3xl -rotate-[18deg] opacity-60"></div>
       <div className="absolute bottom-[38%] left-[12%] w-[650px] sm:w-[1000px] h-36 sm:h-44 bg-gradient-to-r from-purple-100 to-transparent rounded-full blur-3xl rotate-[75deg] opacity-55"></div>
       <div className="absolute top-[72%] right-[35%] w-[600px] sm:w-[950px] h-32 sm:h-40 bg-gradient-to-l from-purple-300 to-transparent rounded-full blur-2xl -rotate-[55deg] opacity-70"></div>

       {/* Additional flowing streaks */}
       <div className="absolute top-[85%] left-[28%] w-[500px] sm:w-[800px] h-24 sm:h-32 bg-gradient-to-r from-pink-100 to-transparent rounded-full blur-xl rotate-[15deg] opacity-50"></div>
       <div className="absolute top-[25%] right-[45%] w-[450px] sm:w-[750px] h-28 sm:h-36 bg-gradient-to-l from-purple-100 to-transparent rounded-full blur-xl -rotate-[68deg] opacity-45"></div>
       <div className="absolute bottom-[18%] left-[55%] w-[400px] sm:w-[700px] h-20 sm:h-28 bg-gradient-to-r from-orange-100 to-transparent rounded-full blur-xl rotate-[38deg] opacity-60"></div>
     </div>

     {/* Subtle overlay for seamless blending */}
     <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none"></div>

     <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
       {/* Header */}
       <div className="mb-8 sm:mb-12">
         <div className="text-center mb-6 sm:mb-8">
           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mt-10 sm:mt-20 mb-4 sm:mb-6">Get Your Deckoviz</h1>
           <p className="text-gray-800 text-sm sm:text-base">Bring your walls to life with the world's most advanced AI-powered</p>
           <p className="text-gray-800 mb-8 sm:mb-14 text-sm sm:text-base">Smart Art Frame.</p>
         </div>
         <div className="text-left">
           <p className="text-gray-900 font-normal mt-4 sm:mt-5 text-sm sm:text-base">Follow the simple steps below to customize and place your order.</p>
         </div>
       </div>

       <div className="space-y-6 relative z-0">
         {/* Step 0.1 - Frame Size */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 relative z-10">
           <div className="mb-4 sm:mb-6">
             <div className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-gray-200">0.1</div>
           </div>
           
           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
             <div className="flex-1 max-w-full lg:max-w-md">
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                 Select Your Frame
               </h3>
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                 Size
               </h3>
               <p className="text-gray-600 text-sm">Choose the size that best fits your space.</p>
             </div>
             
             <div className="w-full lg:w-[40rem]">
               <Dropdown
                 value={selectedFrameSize}
                 onChange={setSelectedFrameSize}
                 placeholder="Choose Size"
                 options={["Small (8x10)", "Medium (11x14)", "Large (16x20)", "X-Large (20x24)"]}
               />
             </div>
           </div>
         </div>

         {/* Step 0.2 - Frame Type */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 relative z-10">
           <div className="mb-4 sm:mb-6">
             <div className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-gray-200">0.2</div>
           </div>

           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
             <div className="flex-1 max-w-full lg:max-w-md">
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                 Select Your Frame
               </h3>
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                 Type
               </h3>
               <p className="text-gray-600 text-sm">Choose from our curated collection of premium</p>
               <p className="text-gray-600 text-sm">frame options.</p>
             </div>
             
             <div className="w-full lg:w-[40rem]">
               <Dropdown
                 value={selectedFrameType}
                 onChange={setSelectedFrameType}
                 placeholder="Choose Frame Type"
                 options={["Classic Wood", "Modern Metal", "Vintage Ornate", "Minimalist"]}
               />
             </div>
           </div>
         </div>

         {/* Step 0.3 - Custom Frame Request */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-10 shadow-lg border border-gray-100 relative z-10">
           <div className="mb-4 sm:mb-6">
             <div className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-gray-200">0.3</div>
           </div>

           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
             <div className="flex-1 max-w-full lg:max-w-md">
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                 Custom Frame 
               </h3>
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-8">
                Request (Optional)
               </h3>
               <p className="text-gray-600 text-sm">Want something truly</p>
               <p className="text-gray-600 text-sm">unique?</p>
             </div>
             
             <div className="w-full lg:w-[40rem]">
               <textarea
                 value={customFrameRequest}
                 onChange={(e) => setCustomFrameRequest(e.target.value)}
                 placeholder="Describe your Custom Frame request..."
                 rows={3}
                 className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300 focus:border-blue-300 resize-none transition-all duration-200 mb-3 text-gray-700 placeholder-gray-600"
               />
               <button
                 type="button"
                 className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg font-medium transition-all duration-200 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
               >
                 <Upload className="w-4 h-4" />
                 Upload Reference Image
               </button>
             </div>
           </div>
         </div>

         {/* Step 0.4 - Number of Units */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 relative z-10">
           <div className="mb-4 sm:mb-6">
             <div className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-gray-200">0.4</div>
           </div>

           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
             <div className="flex-1 max-w-full lg:max-w-md">
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                 Select Number of
               </h3>
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                 Units
               </h3>
               <p className="text-gray-600 text-sm">Need multiple Deckoviz frames? We've got you</p>
               <p className="text-gray-600 text-sm">covered.</p>
             </div>
             
             <div className="w-full lg:w-[40rem]">
               <Dropdown
                 value={selectedUnits}
                 onChange={setSelectedUnits}
                 placeholder="1 Unit"
                 options={["1 Unit", "2 Units", "3 Units", "4 Units", "5+ Units"]}
               />
             </div>
           </div>
         </div>

         {/* Step 0.5 - Subscription Plan */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 relative z-10">
           <div className="mb-4 sm:mb-6">
             <div className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-gray-200">0.5</div>
           </div>

           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
             <div className="flex-1 max-w-full lg:max-w-md">
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                 Choose Your 
               </h3>
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Subscription Plan
               </h3>
               <p className="text-gray-600 text-sm">Choose your plan, which is best</p>
               <p className="text-gray-600 text-sm">for you.</p>
             </div>
             
             <div className="w-full lg:w-[40rem] lg:-mt-10">
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-600 mb-3">Subscription Type</label>
                   <Dropdown
                     value={subscriptionType}
                     onChange={setSubscriptionType}
                     placeholder="Select Type"
                     options={["Basic Plan", "Premium Plan", "Pro Plan"]}
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-600 mb-3">Subscription Period</label>
                   <Dropdown
                     value={subscriptionPeriod}
                     onChange={setSubscriptionPeriod}
                     placeholder="Select Period"
                     options={["Monthly", "Quarterly", "Yearly"]}
                   />
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Step 0.6 - Shipping Address */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
           <div className="mb-4 sm:mb-6">
             <div className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-gray-200">0.6</div>
           </div>

           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
             <div className="flex-1 max-w-full lg:max-w-md">
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                 Enter Shipping
               </h3>
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                 Address
               </h3>
               <p className="text-gray-600 text-sm">Please ensure your address is accurate to</p>
               <p className="text-gray-600 text-sm">avoid delivery issues.</p>
             </div>
             
             <div className="w-full lg:w-[40rem] lg:mt-7">
               <textarea
                 value={shippingAddress}
                 onChange={(e) => setShippingAddress(e.target.value)}
                 placeholder="Enter Your Full Shipping Address"
                 rows={3}
                 className="w-full h-32 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300 focus:border-blue-300 resize-none transition-all duration-200 text-gray-700 placeholder-gray-600"
               />
             </div>
           </div>
         </div>

         {/* Step 0.7 - Delivery Options */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
           <div className="mb-4 sm:mb-6">
             <div className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-gray-200">0.7</div>
           </div>

           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
             <div className="flex-1 max-w-full lg:max-w-md">
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                 Delivery
               </h3>
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                 Options
               </h3>
               <p className="text-gray-600 text-sm">Choose your options according</p>
               <p className="text-gray-600 text-sm">to your needs.</p>
             </div>
             
             <div className="w-full lg:w-[40rem] lg:-mt-10">
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-600 mb-3">Delivery Type</label>
                   <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                     <label className="flex items-center cursor-pointer">
                       <input
                         type="radio"
                         name="deliveryType"
                         value="Standard Delivery"
                         checked={deliveryType === "Standard Delivery"}
                         onChange={(e) => setDeliveryType(e.target.value)}
                         className="mr-3 accent-violet-500 transition-transform duration-200 checked:scale-125"
                       />
                       <span className="text-gray-700 font-medium text-sm sm:text-base">Standard Delivery</span>
                     </label>
                     <label className="flex items-center cursor-pointer">
                       <input
                         type="radio"
                         name="deliveryType"
                         value="Express Delivery"
                         checked={deliveryType === "Express Delivery"}
                         onChange={(e) => setDeliveryType(e.target.value)}
                         className="mr-3 accent-red-600 transition-transform duration-200 checked:scale-125"
                       />
                       <span className="text-gray-700 font-medium text-sm sm:text-base">Express Delivery</span>
                     </label>
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-600 mb-3">Packaging Options</label>
                   <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                     <label className="flex items-center cursor-pointer">
                       <input
                         type="radio"
                         name="packagingType"
                         value="Standard Packaging"
                         checked={packagingType === "Standard Packaging"}
                         onChange={(e) => setPackagingType(e.target.value)}
                         className="mr-3 accent-violet-500 transition-transform duration-200 checked:scale-125"
                       />
                       <span className="text-gray-700 font-medium text-sm sm:text-base">Standard Packaging</span>
                     </label>
                     <label className="flex items-center cursor-pointer">
                       <input
                         type="radio"
                         name="packagingType"
                         value="Express Packaging"
                         checked={packagingType === "Express Packaging"}
                         onChange={(e) => setPackagingType(e.target.value)}
                         className="mr-3 accent-red-500 transition-transform duration-200 checked:scale-125"
                       />
                       <span className="text-gray-700 font-medium text-sm sm:text-base">Express Packaging</span>
                     </label>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Step 0.8 - Review Total */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
           <div className="mb-4 sm:mb-6">
             <div className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-gray-200">0.8</div>
           </div>

           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
             <div className="flex-1 max-w-full lg:max-w-md">
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                 Review Your
               </h3>
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                 Total
               </h3>
             </div>

             <div className="w-full lg:w-[45rem]">
               <div className="bg-white-50/80 backdrop-blur-sm rounded-lg p-4 space-y-3">
                 <div className="flex justify-between items-center">
                   <span className="text-gray-900 text-sm sm:text-base">Frame Cost:</span>
                   <span className="font-semibold text-gray-900 text-sm sm:text-base">$849.00</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-900 text-sm sm:text-base">Subscription Cost:</span>
                   <span className="font-semibold text-gray-900 text-sm sm:text-base">$9.00</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-900 text-sm sm:text-base">Delivery Cost:</span>
                   <span className="font-semibold text-gray-900 text-sm sm:text-base">$9.00</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-900 text-sm sm:text-base">Packaging Surcharge:</span>
                   <span className="font-semibold text-gray-900 text-sm sm:text-base">$0.00</span>
                 </div>
                 <hr className="border-gray-200" />
                 <div className="flex justify-between items-center">
                   <span className="text-lg font-bold text-gray-900">Total Price</span>
                   <span className="text-lg font-bold text-gray-900">$849.00</span>
                 </div>
                 <p className="text-xs text-gray-500 text-center">All tax included.</p>
               </div>
             </div>
           </div>
         </div>

         {/* Step 0.9 - Payment Details */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
           <div className="mb-4 sm:mb-6">
             <div className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-gray-200">0.9</div>
           </div>

           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
             <div className="flex-1 max-w-full lg:max-w-md">
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                 Payment
               </h3>
               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                 Details
               </h3>
               <p className="text-gray-600 text-sm">Your payment is secure and</p>
               <p className="text-gray-600 text-sm">encrypted.</p>
             </div>
             
             <div className="w-full lg:w-[40rem] lg:-mt-10">
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-3">Card Number</label>
                   <input
                     type="text"
                     value={cardNumber}
                     onChange={(e) => setCardNumber(e.target.value)}
                     placeholder="1234 567 8910 1234"
                     className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300 focus:border-blue-300 transition-all duration-200 text-gray-700 placeholder-gray-600"
                   />
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-3">Expiry Date</label>
                     <input
                       type="text"
                       value={expiryDate}
                       onChange={(e) => setExpiryDate(e.target.value)}
                       placeholder="MM/YYYY"
                       className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300 focus:border-blue-300 transition-all duration-200 text-gray-700 placeholder-gray-600"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-3">CVV</label>
                     <input
                       type="text"
                       value={cvv}
                       onChange={(e) => setCvv(e.target.value)}
                       placeholder="123"
                       className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300 focus:border-blue-300 transition-all duration-200 text-gray-700 placeholder-gray-600"
                     />
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder Name</label>
                   <input
                     type="text"
                     value={cardHolderName}
                     onChange={(e) => setCardHolderName(e.target.value)}
                     placeholder="Your Name"
                     className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300 focus:border-blue-300 transition-all duration-200 text-gray-700 placeholder-gray-600"
                   />
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Confirm Button */}
         <div className="pt-6 sm:pt-8 flex justify-center">
           <button
             type="button"
             className="bg-gradient-to-b from-purple-800 to-purple-300 text-white py-3 sm:py-4 px-8 sm:px-12 rounded-2xl font-medium text-base sm:text-lg transition-all duration-200 hover:from-purple-900 hover:to-purple-400 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-200 transform hover:scale-105 w-full sm:w-auto"
           >
             Confirm and Place Order
           </button>
         </div>

         {/* Footer */}
         <div className="text-center pt-6 text-xs sm:text-sm text-gray-500 space-y-1">
           <p>30-day Satisfaction Guarantee</p>
           <p>Free returns for damaged items</p>
           <p>Eco-friendly commitment on packaging</p>
           <p>24/7 customer support available</p>
         </div>
       </div>
     </div>
   </div>
 )
}

export default PlaceOrder