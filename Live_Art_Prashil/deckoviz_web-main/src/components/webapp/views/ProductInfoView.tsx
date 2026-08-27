import { ChevronDown, CreditCard, ShoppingCart } from "lucide-react";
import { figmaAssets } from "../webappData";

export default function ProductInfoView() {
  return (
    <div className="flex w-full justify-center pb-20 pt-8 font-sans">
      <div className="w-full max-w-[1056px]">
        <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-5 text-[22px] font-normal ">Product Info page</h1>

        <div className="mb-8 flex flex-col gap-8 rounded-[14px] border border-[#e5e7eb] p-6 lg:flex-row">
          <div className="w-full lg:w-[47%]">
            <div className="overflow-hidden rounded-[7px] bg-gray-100">
              <img
                src={figmaAssets.spiralOcean}
                alt="The Spiral of Ocean"
                className="h-[394px] w-full object-cover"
              />
            </div>
          </div>

          <div className="flex w-full flex-col justify-start pt-1 lg:w-[53%]">
            <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-2 text-[17px] font-bold ">Richard Mills</h2>
            <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-3 text-[20px] font-bold leading-snug ">
              -The Spiral of Ocean: Solo Rafting, 2025
            </h3>
            <div className="mb-4 text-[25px] font-bold text-black">$ 2,861</div>

            <div className="mb-6 space-y-1 text-[12px] font-medium leading-relaxed text-[#4b5563]">
              <p>Oil on canvas</p>
              <p>100*70*3 Cm</p>
              <p>2025</p>
              <p>Category : Painting on canvas</p>
            </div>

            <div>
              <button className="group flex w-full items-center justify-between text-left">
                <span className="text-[18px] font-bold text-black">About the Product</span>
                <ChevronDown size={20} className="text-black transition-colors group-hover:text-[#2f7bd0]" />
              </button>
              <p className="mt-4 pr-3 text-justify text-[13px] font-medium leading-[1.55] text-[#4b5563]">
                Painting is an ancient medium and even with the introduction of photography,
                film and digital technology, it still has remained a persistent mode of
                expression. So many paintings have been limned over dozens of millennia that
                only a relatively small percentage of them could be construed as timeless
                classics that have become familiar to the public and not coincidentally
                produced by some of the most best paintings.
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-3 rounded-[14px] bg-[#bde4ff] p-4 sm:w-[522px] sm:flex-row">
          <button className="flex h-[42px] w-full items-center justify-center gap-2 rounded-full bg-white px-10 font-medium text-black shadow-sm transition hover:bg-gray-50 sm:w-[240px]">
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>

          <button className="flex h-[42px] w-full items-center justify-center gap-2 rounded-full bg-[#4657bd] px-10 font-medium text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#344497] sm:w-[240px]">
            <CreditCard size={18} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
