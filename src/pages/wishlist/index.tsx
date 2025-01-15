import React from "react";
import Image from "next/image";
import { addCart, Data, removeWishlist } from "@/Redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserProps } from "@/Redux/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { PiHandbagSimpleDuotone } from "react-icons/pi";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const loggedUser = useSelector(
    (state: { user: { User: UserProps[] } }) => state.user.User
  );
  const wishlistData = useSelector(
    (state: { product: { wishlist: Data[] } }) => state.product.wishlist
  );
  const cartData = useSelector(
    (state: { product: { carts: Data[] } }) => state.product.carts
  );
  const isInCart = (id: number) => !!cartData.find((data) => data.id === id);

  const handleRemove = (id: number) => {
    dispatch(removeWishlist(id));
  };

  const handleAddToCart = (item: Data) => {
    if (loggedUser[0]?.username) {
      dispatch(addCart(item));
      // dispatch(addCart({userId:loggedUser[0].userId , item:item}));
      toast("Added in Cart Successfully !!", {
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      navigate.push("/login");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-10">
      {wishlistData.length > 0 && (
        <h1 className="flex items-center gap-2 ml-20 my-6 text-4xl font-bold">
          <FaHeart className="text-green-400" /> My Wishlist
        </h1>
      )}
      {wishlistData.length > 0 ? (
        wishlistData?.map((item: Data) => (
          <div
            key={item.id}
            className="w-[820px] relative flex gap-5 my-5 rounded overflow-hidden shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.title || "Course Image"}
              width={300}
              height={100}
            />

            <div className="px-3 py-4 flex flex-col gap-4">
              <p className="font-bold text-xl mb-2">{item.title}</p>
              <p className="text-gray-700 text-base font-bold">
                Price: $ {item.price}
              </p>
              <p className="text-gray-700 text-base font-bold">{item.slug}</p>
              <p className="text-gray-700 text-base font-bold">
                {item.instructor}
              </p>
              {/* <p className="text-gray-700 text-base">{item.description}</p> */}

              <div className="flex gap-4">
                <button
                  type="button"
                  disabled={!!(isInCart(item.id) && loggedUser[0]?.username)}
                  className={`flex gap-1 items-center
               ${
                 isInCart(item.id) && loggedUser[0]?.username
                   ? "cursor-not-allowed"
                   : "hover:text-gray-600 cursor-pointer"
               }
             `}
                  onClick={() => handleAddToCart(item)}
                >
                  {isInCart(item.id) ? <PiHandbagSimpleDuotone className="text-green-600" /> : <PiHandbagSimpleDuotone />}
                  {isInCart(item.id) ? "Added to Cart" : "Add To Cart"}
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
          <Image
            src="/Image/wishlist.webp"
            alt={"wishlist image"}
            width={400}
            height={400}
          />
          <h3 className="text-2xl font-bold">Your wishlist is empty</h3>
          <p className="text-lg w-96 text-center text-gray-500">
            Looks like you have not added anything to you cart. Go ahead &
            explore top categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
