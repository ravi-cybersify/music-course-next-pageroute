"use client";
import React from "react";
import Image from "next/image";
import {
  addWishlist,
  Data,
  removeCart,
  updateIncQuantiy,
  updateDecQuantiy,
} from "@/Redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserProps } from "@/Redux/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { PiHandbagSimpleDuotone } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import PayCart from "@/components/PayCart";
import { GoHeart } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const loggedUser = useSelector(
    (state: { user: { User: UserProps[] } }) => state.user.User
  );
  const cartData = useSelector(
    (state: { product: { carts: Data[] } }) => state.product.carts
  );
  const wishlistData = useSelector(
    (state: { product: { wishlist: Data[] } }) => state.product.wishlist
  );

  const TotalPrice: number = parseFloat(
    cartData
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );

  const isInWishlist = (id: number) =>
    !!wishlistData.find((data) => data.id === id);

  const handleRemove = (id: number) => {
    dispatch(removeCart(id));
  };

  const handleAddToWishlist = (item: Data) => {
    if (loggedUser[0]?.username) {
      dispatch(addWishlist(item));
      toast("Added to Wishlist Successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      navigate.push("/login");
    }
  };

  const handleIncrement = (id: number) => {
    const item = cartData.find((item) => item.id === id);
    if (item) {
      dispatch(updateIncQuantiy({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (id: number) => {
    const item = cartData.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateDecQuantiy({ id, quantity: item.quantity - 1 }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-10">
      {cartData.length > 0 && (
        <h1 className="flex items-center gap-2 ml-20 my-6 text-4xl font-bold">
          <PiHandbagSimpleDuotone />
          My Cart
        </h1>
      )}
      <div className="flex gap-12">
        <div className="flex flex-col">
          {cartData.length > 0 ? (
            cartData.map((item: Data) => (
              <div
                key={item.id}
                className="w-[820px] relative h-40 flex gap-5 my-5 rounded overflow-hidden shadow-lg"
              >
                <Image
                  src={item.image}
                  alt={item.title || "Course Image"}
                  width={200}
                  height={100}
                />
                <div className="px-3 flex flex-col gap-2">
                  <p className="font-semibold text-xl mb-2">{item.title}</p>
                  <p className="text-gray-700 text-base font-bold">
                    Price: ${Math.floor(item.price * item.quantity)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDecrement(item.id)}
                      className="px-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleIncrement(item.id)}
                      className="px-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button
                      type="button"
                      disabled={
                        !!(isInWishlist(item.id) && loggedUser[0]?.username)
                      }
                      className={`flex gap-1 items-center ${
                        isInWishlist(item.id) && loggedUser[0]?.username
                          ? " cursor-not-allowed"
                          : "hover:text-gray-600 cursor-pointer"
                      }`}
                      onClick={() => handleAddToWishlist(item)}
                    >
                      {isInWishlist(item.id) ? (
                        <FaHeart className="text-green-400" />
                      ) : (
                        <GoHeart />
                      )}
                      {isInWishlist(item.id)
                        ? "Added to Wishlist"
                        : `Add to Wishlist`}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="h-10 absolute right-10 flex items-center hover:text-gray-400"
                >
                  <MdCancel size={20} />
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-5 justify-center items-center mb-28 mt-12">
              <div className="bg-gray-50 rounded-full border">
                <Image
                  src="/Image/cart.png"
                  alt="Cart image"
                  width={400}
                  height={400}
                />
              </div>
              <h3 className="text-2xl font-bold">Your cart is empty</h3>
              <p className="text-lg w-96 text-center text-gray-500">
                Looks like you have not added anything to your cart. Go ahead &
                explore top categories.
              </p>
            </div>
          )}
        </div>
        {cartData.length > 0 && <PayCart TotalPrice={TotalPrice} />}
      </div>
    </div>
  );
};

export default Cart;
