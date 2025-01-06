import React from "react";
import CoursesData from "../data/music-course.json";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addWishlist, Data } from "@/Redux/productSlice";
import { UserProps } from "@/Redux/userSlice";
import { useRouter } from "next/router";


const Card = () => {
  const pathname = usePathname();
  const navigate = useRouter();
  const dispatch = useDispatch();

  const loggedUser = useSelector(
    (state: { user: { User: UserProps[] } }) => state.user.User
  );
  const cartData = useSelector(
    (state: { product: { products: Data[] } }) => state.product.products
  );
  // console.log(cartData)
  const isInCart = (id: number) => !!cartData.find((data) => data.id === id);

  const addCart = (item: Data) => {
    if (loggedUser[0]?.username) {
      dispatch(addProduct(item));
    }else{
      navigate.push("/login");
    }
  };

  const addWishlists = (item : Data) =>{
    if (loggedUser[0]?.username) {
      dispatch(addWishlist(item));
    }else{
      navigate.push("/login");
    }
  }

  const coursesToDisplay =
    pathname === "/product"
      ? CoursesData.courses
      : CoursesData.courses.slice(0, 6);

  return (
    <div className="grid grid-cols-3 gap-5 ml-20 my-12">
      {coursesToDisplay.map((item: Data) => (
        <div
          key={item.id}
          className="max-w-sm rounded overflow-hidden shadow-lg"
        >
          <Image
            src={item.image}
            alt={item.title || "Course Image"}
            width={500}
            height={500}
          />
          <div className="px-3 py-4">
            <p className="font-bold text-xl mb-2">{item.title}</p>
            <p className="text-gray-700 text-base font-bold">
              Price: $ {item.price}
            </p>
            <p className="text-gray-700 text-base font-bold">{item.slug}</p>
            <p className="text-gray-700 text-base font-bold">
              {item.instructor}
            </p>
            <p className="text-gray-700 text-base font-semibold">
              {item.description}
            </p>
          </div>
          <div className="">
            <button
              type="button"
              disabled ={(isInCart(item.id) && loggedUser[0]?.username)}
              className={`text-white mx-auto mb-5 px-2 py-2 font-semibold w-1/2 
             ${
               isInCart(item.id) && loggedUser[0]?.username
                 ? "bg-blue-400 cursor-not-allowed"
                 : "bg-blue-500 cursor-pointer"
             }
           `}
              onClick={() => addCart(item)}
            >
              {isInCart(item.id) ? "Added to Cart" : "Add To Cart"}
            </button>

            <button
              type="button"
              // disabled={isInCart(item.id)}
              className={`text-white mx-auto mb-5 px-2 py-2 font-semibold w-1/2 bg-gray-900  `}
              //  ${
              //   isInCart(item.id) ? "bg-red-400 cursor-not-allowed" : "bg-red-500"
              // }

              onClick={() => addWishlists(item)}
            >
              Add to wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
