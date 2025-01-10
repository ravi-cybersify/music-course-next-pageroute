import React from "react";
import Image from "next/image";
import { addCart, Data, removeWishlist } from "@/Redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserProps } from "@/Redux/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
      dispatch(addCart({userId:loggedUser[0].userId , item:item}));
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
        <h1 className="text-center ml-20 my-10 text-4xl font-bold">
          Wishlist Page
        </h1>
      )}
      {wishlistData.length > 0 ? (
        wishlistData?.map((item: Data) => (
          <div
            key={item.id}
            className="w-3/4 flex gap-5 my-5 rounded overflow-hidden shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.title || "Course Image"}
              width={500}
              height={500}
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
              <p className="text-gray-700 text-base">{item.description}</p>

              <div className="flex gap-4">
                <button
                  type="button"
                  disabled={!!(isInCart(item.id) && loggedUser[0]?.username)}
                  className={`text-white  px-3 py-2 rounded-xl flex items-center
               ${
                 isInCart(item.id) && loggedUser[0]?.username
                   ? "bg-gray-400 cursor-not-allowed"
                   : "bg-gray-800 cursor-pointer"
               }
             `}
                  onClick={() => handleAddToCart(item)}
                >
                  {isInCart(item.id) ? "Added to Cart" : "Add To Cart"}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="text-white bg-red-500 px-3 rounded-xl w-20 flex items-center "
                >
                  Remove
                </button>
              </div>
            </div>
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
