import React from "react";
import Image from "next/image";
import { Data, removeProduct } from "@/Redux/productSlice";
import { useDispatch, useSelector } from "react-redux";


const Cart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state:{ product: { products: Data[] } })=>state.product.products)
  const handleRemove = (id:number)=>{
      dispatch(removeProduct(id))
  }

  return (
    <div>
      <h1 className="text-left ml-20 mt-6 text-4xl font-bold">Cart Page</h1>
      {data.map((item: Data) => (
        <div
          key={item.id}
          className="w-3/4 ml-20 flex gap-5 my-5 rounded overflow-hidden shadow-lg"
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
            <p className="text-gray-700 text-base font-bold">
              {item.slug}
            </p>
            <p className="text-gray-700 text-base font-bold">
              {item.instructor}
            </p>
            <p className="text-gray-700 text-base">
              {item.description}
            </p>

            <button type="button" onClick={()=> handleRemove(item.id)} className="text-white bg-red-500 px-3 py-1 rounded-xl w-20 flex items-center ">Remove</button>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default Cart;
