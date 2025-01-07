import { addCart, addWishlist, Data } from "@/Redux/productSlice";
import { UserProps } from "@/Redux/userSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useRouter(); 

  const DetailsData = window.localStorage.getItem("product_details");
  const ProductData = DetailsData ? JSON.parse(DetailsData) : [];


  const loggedUser = useSelector(
    (state: { user: { User: UserProps[] } }) => state.user.User
  ); 
 const cartData = useSelector(
    (state: { product: { carts: Data[] } }) => state.product.carts
  ); 
  const isInCart = (id: number) => !!cartData.find((data) => data.id === id);

 const wishlistData = useSelector(
    (state: { product: { wishlist: Data[] } }) => state.product.wishlist
  ); 
const isInWishlist = (id: number) => !!wishlistData.find((data) => data.id === id);

  const handleAddToWishlist = (item:Data) => {
     if (loggedUser[0]?.username) {
           dispatch(addWishlist(item));
         }else{
           navigate.push("/login");
         }
   };

    const handleAddToCart = (item: Data) => {
       if (loggedUser[0]?.username) {
         dispatch(addCart(item));
       } else {
         navigate.push("/login");
       }
     };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-center ml-20 my-10 text-4xl font-bold">
        Product Details
      </h1>
      
        <div
          className="w-3/4 flex gap-5 my-5 rounded overflow-hidden shadow-lg"
        >
          <Image
            src={ProductData.image}
            alt={ProductData.title || "Course Image"}
            width={500}
            height={500}
          />

          <div className="px-3 py-4 flex flex-col gap-4">
            <p className="font-bold text-xl mb-2">{ProductData.title}</p>
            <p className="text-gray-700 text-base font-bold">
              Price: $ {ProductData.price}
            </p>
            <p className="text-gray-700 text-base font-bold">{ProductData.slug}</p>
            <p className="text-gray-700 text-base font-bold">
              {ProductData.instructor}
            </p>
            <p className="text-gray-700 text-base">{ProductData.description}</p>

            <div className="flex gap-4">
              <button
                type="button"
                disabled={!!(isInCart(ProductData.id) && loggedUser[0]?.username)}
                className={`text-white  px-3 py-2 rounded-xl flex items-center
                         ${
                           isInCart(ProductData.id) && loggedUser[0]?.username
                             ? "bg-gray-400 cursor-not-allowed"
                             : "bg-gray-800 cursor-pointer"
                         }
                       `}
                onClick={() => handleAddToCart(ProductData)}
              >
                {isInCart(ProductData.id) ? "Added to Cart" : "Add To Cart"}
              </button>

              <button
                type="button"
                disabled ={!!(isInWishlist(ProductData.id) && loggedUser[0]?.username)}
                className={`text-white  px-3 py-2 rounded-xl flex items-center
               ${
                isInWishlist(ProductData.id) && loggedUser[0]?.username
                   ? "bg-gray-400 cursor-not-allowed"
                   : "bg-gray-800 cursor-pointer"
               }
             `}
                onClick={() => handleAddToWishlist(ProductData)}
              >
                {isInWishlist(ProductData.id) ? "Added to wishlist" : "Add to wishlist"}
              </button>
              
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProductDetails;
