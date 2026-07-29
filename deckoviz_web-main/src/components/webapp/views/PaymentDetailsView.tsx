import { useState, useEffect } from "react";
import { Plus, MoreHorizontal, ChevronDown, Loader2 } from "lucide-react";
import { webappApi } from "../../../lib/webappApi";

/* ───────── DATA ───────── */

const fallbackAddresses = [
  {
    id: "1",
    label: "Home",
    phone: "(424) 985-8942",
    street: "114 Glann Rd",
    city: "Apalachin, New York(NY),",
    zip: "13732",
    selected: true,
  },
  {
    id: "2",
    label: "Offices",
    phone: "(424) 985-8942",
    street: "114 Glann Rd",
    city: "Apalachin, New York(NY),",
    zip: "13732",
    selected: false,
  },
];

const fallbackCards = [
  {
    id: "1",
    name: "Marisa Lu",
    number: "**** **** **** 4523",
    balance: "$28,678.65",
    currency: "USD",
    status: "06/24 (Active)",
    validThru: "06/24",
    type: "VISA",
  },
  {
    id: "2",
    name: "Marisa Lu",
    number: "**** **** **** 4523",
    balance: "$28,678.65",
    currency: "USD",
    status: "06/24 (Active)",
    validThru: "06/24",
    type: "VISA",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */

export default function PaymentDetailsView() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      webappApi.getAddresses().catch(() => []),
      webappApi.getPaymentMethods().catch(() => [])
    ]).then(([addrRes, cardsRes]) => {
      const addrs = addrRes.length ? addrRes : fallbackAddresses;
      setAddresses(addrs);
      setSavedCards(cardsRes.length ? cardsRes : fallbackCards);
      
      const defaultAddr = addrs.find((a: any) => a.selected);
      if (defaultAddr) setSelectedAddress(defaultAddr.id);
      else if (addrs.length > 0) setSelectedAddress(addrs[0].id);
    }).finally(() => setLoading(false));
  }, []);

  const handleSelectAddress = async (id: string) => {
    setSelectedAddress(id);
    try {
      await webappApi.selectAddress(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await webappApi.createOrder({ addressId: selectedAddress });
      alert("Order placed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  if (loading) {
    return <div className="flex w-full justify-center p-20"><Loader2 className="animate-spin text-blue-500 w-10 h-10" /></div>;
  }

  return (
    <div className="w-full flex justify-center pb-20">
      <div className="w-full max-w-5xl">
        <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-3xl font-bold  mb-8">
          Payment Details
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ─── Left Column ─── */}
          <div className="flex-1">
            {/* Shipping Address */}
            <div className="rounded-2xl p-6 border border-gray-100 mb-6">
              <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold  mb-1">
                Shipping Address
              </h2>

              {/* Add to Address link */}
              <button className="flex items-center gap-2 text-blue-500 text-sm font-medium mb-5 hover:text-blue-600 transition">
                <Plus size={16} />
                Add to Address
              </button>

              {/* Address Cards */}
              <div className="grid grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => handleSelectAddress(addr.id)}
                    className={`rounded-2xl p-5 cursor-pointer transition-all relative ${
                      selectedAddress === addr.id
                        ? "border-2 border-blue-400 bg-blue-50/30 shadow-md"
                        : "border border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {/* More options */}
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                      <MoreHorizontal size={18} />
                    </button>

                    <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-sm font-bold  mb-2">
                      {addr.label || addr.street}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{addr.phone}</p>
                    <p className="text-sm text-gray-600">{addr.street}</p>
                    <p className="text-sm text-gray-600">
                      {addr.city}
                    </p>
                    <p className="text-sm text-gray-600">{addr.zip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit Cards */}
            <div className="grid grid-cols-2 gap-4">
              {savedCards.map((card) => (
                <div key={card.id} className="rounded-2xl p-5 border border-gray-100"
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      Add Card
                    </span>
                    <Plus size={16} className="text-gray-400" />
                  </div>

                  {/* Credit Card Visual */}
                  <div className="relative w-full h-[140px] rounded-xl overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#2d1b4e] to-[#1a1a2e]">
                      {/* Decorative circles */}
                      <div className="absolute top-4 left-4 w-24 h-24 rounded-full opacity-60"
                        style={{
                          background: "radial-gradient(circle, #3b82f6 0%, #2563eb 30%, #6366f1 60%, transparent 70%)",
                        }}
                      ></div>
                      <div className="absolute top-8 left-20 w-20 h-20 rounded-full opacity-50"
                        style={{
                          background: "radial-gradient(circle, #60a5fa 0%, #818cf8 40%, transparent 70%)",
                        }}
                      ></div>
                      <div className="absolute bottom-4 right-8 w-16 h-16 rounded-full opacity-40"
                        style={{
                          background: "radial-gradient(circle, #2563eb 0%, #6366f1 40%, transparent 70%)",
                        }}
                      ></div>
                      
                      {/* Card Text */}
                      <div className="absolute top-4 right-4 text-[8px] text-gray-300 tracking-widest uppercase">
                        Credit Card
                      </div>
                      <div className="absolute top-4 right-4 mt-3 text-white text-xs font-bold tracking-wider">
                        {card.type || "VISA"}
                      </div>
                      <div className="absolute bottom-4 left-4 text-white text-xs font-medium">
                        {card.name}
                      </div>
                      <div className="absolute bottom-4 right-4 text-gray-300 text-[10px]">
                        Valid thru {card.validThru}
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-sm font-bold  mb-3">
                    Card details
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Card number</span>
                      <span className="text-xs font-medium text-gray-400">
                        {card.number || "**** **** **** 4523"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Balance</span>
                      <span className="text-xs font-bold text-gray-900">
                        {card.balance || "$0.00"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Currency</span>
                      <span className="text-xs font-medium text-gray-700">
                        {card.currency || "USD"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Status card</span>
                      <span className="text-xs font-medium text-gray-700">
                        {card.status || "Active"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Right Column — Payment Form ─── */}
          <div className="w-full lg:w-[380px]">
            <div className="rounded-2xl p-8 border border-gray-100 sticky top-10">
              <p className="text-sm text-gray-600 mb-8">
                Fill in your payment details and complete the order
              </p>

              {/* Name on card */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name on card*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="James william"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-gray-600"
                  />
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Expiry Date & CVV */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="DD/MM/YY"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-gray-600"
                    />
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
                <div className="w-28">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-gray-600"
                    />
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Card Number */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 567 8910 22334"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-gray-600"
                  />
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Place Order Button */}
              <button onClick={handlePlaceOrder} className="w-full bg-[#3b5bdb] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 text-sm">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
