
import { Data } from "@/Redux/productSlice";
import Link from "next/link";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartData = useSelector((state:{products:Data[]}) => state.products);
  return (
    <nav className="block w-full px-4 py-2 mx-auto text-black shadow-md lg:px-8 lg:py-3 mt-1">
      <div className="flex flex-wrap items-center justify-between mx-20 text-gray-100">
        <div className="flex flex-wrap items-center gap-4 font-semibold">
          <Link
            href="/"
            className="mr-4 block cursor-pointer py-1.5 text-base text-black font-bold"
          >
            E-comm-Web
          </Link>
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-12">
              <li className="flex items-center p-1 text-sm gap-x-4 text-black">
                <Link href="/">Home</Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-4 text-black">
                <Link href="/product">Products</Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-4 text-black">
                <Link href="/aboutus">About</Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-4 text-black">
                <Link href="/contact">Contact us</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative inline-flex">
          {/* Cart Button */}
          <Link href={'/cart'}>
          <button
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            
          >
            <FaCartShopping size={20} />
          </button>

          {/* Cart Counter */}
          <span className="absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-blue-600 py-1 px-1 text-xs text-white">
          {cartData.length}
          </span>
          </Link>

         
        </div>
      </div>
    </nav>
  )
}

export default Navbar
