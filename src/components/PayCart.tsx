import React from "react";
import { PiHandbagSimpleDuotone } from "react-icons/pi";

interface totalPriceProps{
    TotalPrice: number
}

const PayCart = ({TotalPrice}:totalPriceProps) => {
   
  return (
    <div className="w-full max-w-[440px] border shadow-lg h-1/2 mt-5 py-10 px-10 flex flex-col gap-4">
      <p className="flex gap-2 items-center text-2xl font-semibold">
        <PiHandbagSimpleDuotone /> Cart Summary
      </p>
      <div className="flex flex-col gap-2 mt-2 font-semibold">
        <p className="flex justify-between ">
          <span>Merchandise :</span>
          <span>${TotalPrice}</span>
        </p>
        <div className="">
          <p className="flex justify-between ">
            <span>EST. Shipping & Handling :</span>
            <span>$15.00</span>
          </p>
          <p className="flex justify-between text-red-600 font-semibold">
            <span>Shipping Discount :</span>
            <span>-$15.00</span>
          </p>
          <p className="flex justify-between ">
            <span>EST. Tax :</span>
            <span>$10.00</span>
          </p>
        </div>
        <hr />
        <p className="flex justify-between font-bold text-xl ">
          <span>EST. Order Total :</span>
          <span>${TotalPrice + 10}</span>
        </p>
      </div>

      <hr className="border-2 border-black" />
       
       <div className="">
        <p className="text-lg font-bold">Apply a Promotion Code</p>
        <p>Remove any spaces or dashes before hitting apply.</p>
        <div className="flex gap-3 mt-4">
        <input type="text" name="" id=""  className="border border-black py-1 px-3 w-full" />
        <button type="button" className="px-2 py-1 border-2 border-black">Apply</button>
        </div>
       </div>

        <div className="mt-3">
        <button type="button" className="w-full text-center bg-black text-white py-2">CHECKOUT NOW</button>
        <p className="text-gray-500 mt-1">By Continuing to Checkout, you are agreeing to our Terms of Use and Privacy & Policy.</p>
        </div>

        <hr className="border-2 border-black mt-4" />

        <p className="text-center">Or use other checkout methods:</p>

        <button type="button" className="bg-yellow-400 w-full py-1 border text-lg"><span className="text-blue-800 font-bold">Pay</span><span className="text-[#2690A3] font-bold" >Pal</span> </button>
        

    </div>
  );
};

export default PayCart;
