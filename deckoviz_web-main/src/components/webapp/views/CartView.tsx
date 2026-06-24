import { useState } from "react";
import { ChevronLeft, CreditCard, Minus, Plus, Settings, Trash2, Truck } from "lucide-react";
import { figmaAssets } from "../webappData";

const cartItems = [
  {
    id: 1,
    title: "Ancient Geeks",
    artist: "Richard Mills",
    size: "Mid",
    medium: "Oil on canvas",
    price: 279,
    quantity: 1,
    image: figmaAssets.soloRafting,
  },
  {
    id: 2,
    title: "Ancient Geeks",
    artist: "Richard Mills",
    size: "Mid",
    medium: "Oil on canvas",
    price: 279,
    quantity: 1,
    image: figmaAssets.auroraLake,
  },
];

export default function CartView() {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFees = 39;
  const total = subtotal + deliveryFees;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex w-full justify-center pb-20 pt-8">
      <div className="w-full max-w-[1062px]">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium mb-4 transition">
          <ChevronLeft size={18} /> Back
        </button>

        <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-6 text-[27px] font-medium ">Add to Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Cart Items */}
          <div className="flex-1">
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 rounded-[8px] border border-[#d6d6da] p-5">
                  {/* Image */}
                  <div className="h-[151px] w-[179px] flex-shrink-0 overflow-hidden rounded-[7px]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-base font-bold  mb-0.5">{item.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">by {item.artist}</p>
                      <p className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">Size:</span> {item.size}
                      </p>
                      <p className="text-xs text-gray-500">{item.medium}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition text-xs"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition text-xs"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                      <p className="text-xl font-bold text-gray-900">${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping */}
            <div className="rounded-2xl p-5 border border-gray-100 mt-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                </div>
                <Truck size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-900">Standard Shipping</span>
                <button className="text-blue-500 text-xs font-medium hover:text-blue-600 transition">(Change)</button>
              </div>
              <span className="text-sm font-bold text-gray-900">$0.00</span>
            </div>

            {/* Vouchers */}
            <div className="mt-6">
              <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold  mb-4">Vouchers & Gift Cards</h3>
              <div className="rounded-2xl p-5 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  </div>
                  <CreditCard size={18} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">Apply Gift Cards</span>
                </div>
                <span className="text-sm font-bold text-gray-900">$0.00</span>
              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="w-full lg:w-[360px]">
            <div className="rounded-2xl border border-gray-100 overflow-hidden sticky top-10">
              {/* Featured Image */}
              <div className="h-48 overflow-hidden">
                <img 
                src={figmaAssets.spiralOcean}
                  alt="Order" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Summary Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Settings size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-500">+{totalItems} Items</span>
                </div>

                <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold  mb-1">Echoes of the Sea</h3>
                <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                  The painting includes a deep sea in echoes it can be a symbol of resilience
                </p>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Item Piece: {totalItems}</span>
                    <span className="font-bold text-gray-900">${subtotal.toLocaleString()},-</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sub Total :</span>
                    <span className="font-bold text-gray-900">${subtotal.toLocaleString()},-</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Fees :</span>
                    <span className="font-bold text-gray-900">${deliveryFees},-</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-sm">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">${total.toLocaleString()}-</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 mb-4">
                  Delivery free and taxes (if applicable) to be Calculated during Checkout
                </p>

                <button className="w-full bg-[#3b5bdb] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 text-sm">
                  Continue Order
                </button>

                <p className="text-[10px] text-gray-400 text-center mt-3 italic">
                  Accepted Secure Payments Methods
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
