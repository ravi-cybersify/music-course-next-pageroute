import React from "react";
import CoursesData from "../data/music-course.json";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, Data } from "@/Redux/productSlice";

const Card = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const cartData = useSelector((state: { products: Data[] }) => state.products);

  const isInCart = (id: number) => !!cartData.find((data) => data.id === id);

  const addCart = (item: Data) => {
    dispatch(addProduct(item));
  };

  const coursesToDisplay =
    pathname === "/product" ? CoursesData.courses : CoursesData.courses.slice(0, 6);

  return (
    <div className="grid grid-cols-3 gap-5 ml-20 my-12">
      {coursesToDisplay.map((item: Data) => (
        <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image
            src={item.image}
            alt={item.title || "Course Image"}
            width={500}
            height={500}
          />
          <div className="px-3 py-4">
            <p className="font-bold text-xl mb-2">{item.title}</p>
            <p className="text-gray-700 text-base font-bold">Price: $ {item.price}</p>
            <p className="text-gray-700 text-base font-bold">{item.slug}</p>
            <p className="text-gray-700 text-base font-bold">{item.instructor}</p>
            <p className="text-gray-700 text-base font-semibold">
              {item.description}
            </p>
          </div>
          <button
            type="button"
            disabled={isInCart(item.id)}
            className={`text-white mx-auto mb-5 px-2 py-2 font-semibold w-full ${
              isInCart(item.id) ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500"
            }`}
            onClick={() => addCart(item)}
          >
            {isInCart(item.id) ? "Added to Cart" : "Add To Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Card;
