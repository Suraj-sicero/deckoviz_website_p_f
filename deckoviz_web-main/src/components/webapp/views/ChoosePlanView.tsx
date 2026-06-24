import { CalendarDays, Check, CreditCard, Package, Search, Users } from "lucide-react";
import type React from "react";

const plans = [
  {
    name: "Basic Plan",
    description: "Best for those who simply love art.",
    price: "$228/yearly",
    active: false,
  },
  {
    name: "Advanced Plan",
    description: "Exclusively crafted for true art connoisseurs.",
    price: "$1,190/yearly",
    active: true,
  },
  {
    name: "Premium Plan",
    description: "Best designed for independent artists with a purpose",
    price: "$3,558/yearly",
    active: false,
  },
];

const features = [
  { icon: <Package size={17} />, label: "Create and share Private Collection" },
  { icon: <Package size={17} />, label: "Custom reports and private collection" },
  { icon: <Search size={17} />, label: "Priority listing in search" },
  { icon: <Users size={17} />, label: "Enhanced 24/7 Support" },
  { icon: <Users size={17} />, label: "Analytics on artwork views" },
];

export default function ChoosePlanView() {
  return (
    <div className="flex w-full justify-center pb-16 pt-5">
      <div className="grid w-full max-w-[1094px] gap-9 rounded-[3px] px-8 py-8 lg:grid-cols-[520px_1fr]">
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[23px] font-medium ">Choose Plan</h1>
            <div className="flex rounded-full bg-[#f5f5f5] p-1">
              <button className="rounded-full px-5 py-2 text-[12px] font-medium text-black">Monthly</button>
              <button className="rounded-full bg-[#4657bd] px-5 py-2 text-[12px] font-medium text-white shadow-md">Yearly</button>
            </div>
          </div>

          <div className="space-y-6">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-[16px] border bg-white p-7 ${
                  plan.active
                    ? "border-[#9bd8ff] shadow-[0_0_0_6px_#bde4ff,0_10px_22px_rgba(47,123,208,0.16)]"
                    : "border-[#dddddf] shadow-[0_0_0_6px_#f2f2f2]"
                }`}
              >
                <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-5 text-[22px] font-medium ">{plan.name}</h2>
                <p className="mb-7 text-[17px] text-[#333333]">{plan.description}</p>
                <p className="text-[25px] font-semibold text-black">{plan.price}</p>
              </article>
            ))}

            <div className="-mt-2 rounded-[8px] bg-[#bde4ff] p-4">
              <div className="mb-4 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 rounded-full bg-[#4657bd] px-6 py-3 text-[15px] font-medium text-white">
                  <CreditCard size={17} />
                  Purchase
                </button>
                <button className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-black">
                  <CalendarDays size={17} />
                  Know more
                </button>
              </div>
              <div className="rounded-[12px] px-6 py-4">
                <div className="space-y-4">
                  {features.map((feature) => (
                    <div key={feature.label} className="flex items-center gap-4 text-[15px] text-[#777b83]">
                      <span className="text-[#8b9099]">{feature.icon}</span>
                      {feature.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-8 text-[24px] font-medium ">Contact information</h2>
          <Field label="Email">
            <input className="h-[45px] w-full rounded-[6px] border border-[#d7d7da] px-4 text-[16px] outline-none shadow-[0_2px_8px_rgba(15,23,42,0.08)]" placeholder="email@example.com" />
          </Field>

          <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-6 mt-8 text-[24px] font-medium ">Payment method</h2>
          <Field label="Card information">
            <div className="overflow-hidden rounded-[6px] border border-[#d7d7da]">
              <div className="flex h-[45px] items-center justify-between border-b border-[#d7d7da] px-4">
                <span className="text-[#9ca3af]">1234 1234 1234 1234</span>
                <span className="text-[10px] font-bold text-[#2f7bd0]">VISA MC AMEX JCB</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-[#d7d7da]">
                <input className="h-[43px] px-4 outline-none" placeholder="MM / YY" />
                <input className="h-[43px] px-4 outline-none" placeholder="CVC" />
              </div>
            </div>
          </Field>

          <Field label="Cardholder name">
            <input className="h-[45px] w-full rounded-[6px] border border-[#d7d7da] px-4 text-[16px] outline-none shadow-[0_2px_8px_rgba(15,23,42,0.08)]" placeholder="Full name on card" />
          </Field>

          <Field label="Billing address">
            <div className="overflow-hidden rounded-[6px] border border-[#d7d7da]">
              <select className="h-[44px] w-full border-b border-[#d7d7da] bg-white px-4 text-[#333333] outline-none">
                <option>United States</option>
              </select>
              <input className="h-[44px] w-full px-4 outline-none" placeholder="Address" />
            </div>
          </Field>

          <button className="mb-7 text-[13px] text-[#555963] underline">Enter address manually</button>

          <div className="mb-6 overflow-hidden rounded-[6px] border border-[#d7d7da]">
            <div className="flex items-start gap-3 p-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-[3px] border border-[#d7d7da]">
                <Check size={18} />
              </span>
              <div>
                <p className="text-[17px] font-medium text-[#333333]">Save my information for faster checkout</p>
                <p className="text-[15px] leading-snug text-[#777b83]">Securely pay on Deckoviz web Portal everywhere link is accepted.</p>
              </div>
            </div>
            <div className="border-t border-[#d7d7da] px-4 py-2 text-[15px] text-[#777b83]">(201) 555-0123</div>
          </div>

          <label className="mb-5 flex items-start gap-4 text-[15px] leading-relaxed text-[#777b83]">
            <span className="mt-1 h-5 w-5 rounded-[4px] border border-[#d7d7da]" />
            <span>
              I agree to Deckoviz Purchase <u>Terms of Service</u> and <u>Privacy Policy</u>
            </span>
          </label>

          <button className="mb-4 h-[53px] w-full rounded-[5px] bg-[#4657bd] text-[21px] font-medium text-white shadow-md">
            Subscribe
          </button>
          <p className="text-center text-[15px] text-[#777b83]">
            You also agree to the Link <u>Terms</u> and <u>Privacy Policy</u>.
          </p>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 block text-[16px] font-medium text-[#555963]">{label}</span>
      {children}
    </label>
  );
}
