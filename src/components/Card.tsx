import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, Data } from "@/Redux/productSlice";
import { UserProps } from "@/Redux/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Search from "./Search";
import Filter from "./Filter";
import Pagination from "./Pagination";
import { GoHeart } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";
import courses from "../data/music-course";

const Card = () => {
  const pathname = usePathname();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState<number[]>([90, 200]); //pagination
  const [searchQuery, setSearchQuery] = useState<string>(""); //search
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const storedPage = localStorage.getItem("currentsPage");
      return storedPage ? JSON.parse(storedPage) : 0;
    }
    return 0;
  });

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const loggedUser = useSelector(
    (state: { user: { User: UserProps[] } }) => state.user.User
  );

  const wishlistData = useSelector(
    (state: { product: { wishlist: Data[] } }) => state.product.wishlist
  );

  const isInWishlist = (id: number) =>
    !!wishlistData.find((data) => data.id === id);

  const addWishlists = (item: Data) => {
    if (loggedUser[0]?.username) {
      dispatch(addWishlist(item));
      toast("Added in Wishlist Successfully !!", {
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      navigate.push("/login");
    }
  };

  const handleDetails = (item: Data) => {
    if (loggedUser[0]?.username) {
      localStorage.setItem("product_details", JSON.stringify(item));
      navigate.push("/productdetails");
    } else {
      if (loggedUser[0]?.username) {
        localStorage.removeItem("product_details");
        navigate.push("/login");
      }
    }
  };

  //pagination and search and filter

  const itemsPerPage: number = 8;
  const filteredItems = courses.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      item.price >= value[0] &&
      item.price < value[1]
  );
  const startitem: number = currentPage * itemsPerPage;
  const currentItems = filteredItems.slice(startitem, startitem + itemsPerPage);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    if (typeof window !== "undefined") {
      localStorage.setItem("currentsPage", JSON.stringify(event.selected));
    }
  };

  return (
    <div className="">
      {pathname === "/product" && (
        <div className="flex justify-between mx-28 gap-5">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Filter value={value} handleChange={handleChange} />
        </div>
      )}
      <div className="grid grid-cols-4 gap-5 mx-28 my-6">
        { (pathname === '/' ? courses?.slice(0,8) : currentItems)
        .map((item: Data) => (
          <div
            key={item.id}
            className="max-w-72 rounded overflow-hidden hover:shadow-lg relative"
          >
            <div onClick={() => handleDetails(item)} className="">
              <div className="">
                <Image
                  src={item.image}
                  alt={item.title || "Course Image"}
                  priority
                  width={500}
                  height={500}
                  className="h-80 w-72"
                />
              </div>
              <div className="px-3 py-4">
                <p className="font-semibold text-md">{item.title}</p>
                <p className="text-gray-700 text-md font-semibold">
                  {item.instructor}
                </p>
                <p className="text-gray-700 mt-1 text-md font-semibold flex gap-2">
                  <span className="font-bold text-lg">${item.price}</span>
                  <span className="line-through text-gray-400">
                    $
                    {(
                      item.price +
                      Math.floor((item.price * item.discount) / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="text-green-500 font-bold">
                    {item.discount}% off
                  </span>
                </p>

                <p className="text-red-800 font-bold">Only few left</p>
              </div>
            </div>

            <div className="">
              <button
                type="button"
                disabled={!!(isInWishlist(item.id) && loggedUser[0]?.username)}
                className={`text-white absolute top-3 left-60 hover:text-green-300
               ${
                 isInWishlist(item.id) && loggedUser[0]?.username
                   ? "text-green-400"
                   : "text-gray-200 cursor-pointer"
               }
              `}
                onClick={() => addWishlists(item)}
              >
                {isInWishlist(item.id) ? (
                  <FaHeart size={28} className="text-green-400 " />
                ) : (
                  <GoHeart size={28} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {pathname === "/product" && (
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
      )}
    </div>
  );
};

export default Card;
