'use client'
import { Data } from "@/Redux/productSlice";
import { removeUser, UserProps } from "@/Redux/userSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const cartData = useSelector(
    (state: { product: { carts: Data[] } }) => state.product.carts
  );
  const wishlistData = useSelector(
    (state: { product: { wishlist: Data[] } }) => state.product.wishlist
  );

  const loggedUser = useSelector(
    (state: { user: { User: UserProps[] } }) => state.user.User
  );
  // console.log(loggedUser, "cartdata");

  const handleLogout = () => {
    dispatch(removeUser());
  };
  return (
    <div className="block w-full px-4 py-2 mx-auto text-black shadow-md lg:px-8 lg:py-3 mt-1">
      <div className="flex flex-wrap items-center justify-between mx-20 text-gray-100">
        <div className="flex flex-wrap items-center gap-4 font-semibold">
          <Link
            href="/"
            className="mr-4 block cursor-pointer py-1.5 text-base text-black font-bold"
            suppressHydrationWarning >
            E-comm-Web
          </Link>
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-12">
              <li
                className={`flex items-center p-1 text-sm gap-x-4 ${
                  pathname === "/" ? "text-blue-800" : "text-black"
                }`}
              >
                <Link href="/" suppressHydrationWarning>Home</Link>
              </li>
              <li
                className={`flex items-center p-1 text-sm gap-x-4 ${
                  pathname === "/product" ? "text-blue-800" : "text-black"
                }`}
              >
                <Link
                  href={`${loggedUser[0]?.username ? "/product" : "/login"}`}
                  suppressHydrationWarning >
                  Products
                </Link>
              </li>
              <li
                className={`flex items-center p-1 text-sm gap-x-4 ${
                  pathname === "/about" ? "text-blue-800" : "text-black"
                }`}
              >
                <Link href="/about" suppressHydrationWarning>About</Link>
              </li>
              <li
                className={`flex items-center p-1 text-sm gap-x-4 ${
                  pathname === "/contact" ? "text-blue-800" : "text-black"
                }`}
              >
                <Link href="/contact" suppressHydrationWarning>Contact us</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <h1 className="text-black mr-7">{loggedUser[0]?.username}</h1>
          <div className="inline-flex">
            <Link href={`${loggedUser[0]?.username ? "/wishlist" : "/login"}`} suppressHydrationWarning>
              <button
                className="relative right-6 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <GoHeart size={20} />
              </button>

              {loggedUser[0]?.username && (
                <span className="absolute top-5  grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-blue-600 py-1 px-1 text-xs text-white">
                  {wishlistData.length}
                </span>
              )}
            </Link>
          </div>
          <div className=" inline-flex">
            {/* Cart Button */}
            <Link href={`${loggedUser[0]?.username ? "/cart" : "/login"}`} suppressHydrationWarning>
              <button
                className="relative right-6 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <FaCartShopping size={20} />
              </button>

              {/* Cart Counter */}
              {loggedUser[0]?.username && (
                <span className="absolute top-5  grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-blue-600 py-1 px-1 text-xs text-white">
                  {cartData.length}
                </span>
              )}
            </Link>
          </div>
          {loggedUser[0]?.username ? (
            <Link href={"/login"} suppressHydrationWarning>
              <button
                type="button"
                onClick={handleLogout}
                className="text-red-500 font-bold"
              >
                Logout
              </button>
            </Link>
          ) : (
            <div className="flex gap-1">
              <Link href={"/login"} suppressHydrationWarning>
                <button
                  type="button"
                  className={`font-semibold ${
                    pathname === "/login" ? "text-blue-500" : "text-black"
                  }`}
                >
                  Login
                </button>
              </Link>
              <span className="text-black font-semibold">/</span>
              <Link href={"/register"} suppressHydrationWarning>
                <button
                  type="button"
                  className={`font-semibold ${
                    pathname === "/register" ? "text-blue-500" : "text-black"
                  }`}
                >
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
