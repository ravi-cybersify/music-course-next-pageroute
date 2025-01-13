import React, { useEffect, useState } from "react";
import CoursesData from "../data/music-course.json";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addCart, addWishlist, Data } from "@/Redux/productSlice";
import { UserProps } from "@/Redux/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const Card = () => {
  const pathname = usePathname();
  const navigate = useRouter();
  const dispatch = useDispatch();

  const loggedUser = useSelector(
    (state: { user: { User: UserProps[] } }) => state.user.User
  );
  const cartData = useSelector(
    (state: { product: { carts: Data[] } }) => state.product.carts
  );
  const wishlistData = useSelector(
    (state: { product: { wishlist: Data[] } }) => state.product.wishlist
  );
  const isInCart = (id: number) => !!cartData.find((data) => data.id === id);
  const isInWishlist = (id: number) =>
    !!wishlistData.find((data) => data.id === id);

  const addCartData = (item: Data) => {
    if (loggedUser[0]?.username) {
      dispatch(addCart(item));
      // dispatch(addCart({userId:loggedUser[0].userId , item:item}));    //for multiple users cart
      toast("Added in Cart Successfully !!", {
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      navigate.push("/login");
    }
  };

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
      navigate.push("/login");
    }
  };

  // paggination

  const itemsPerPage: number = 6;

  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const storedPage = localStorage.getItem("currentsPage");
      return storedPage ? JSON.parse(storedPage) : 0;
    }
    return 0;
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const items = CoursesData.courses.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const offset: number = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentsPage", JSON.stringify(currentPage));
    }
  }, [currentPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="">
      {pathname === "/product" && (
        <div className="flex justify-center mb-6">
          <input
            type="search"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
            className="w-full max-w-xl mt-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-5 ml-20 my-12">
        {currentItems.map((item: Data) => (
          <div
            key={item.id}
            className="max-w-sm rounded overflow-hidden shadow-lg"
          >
            <div onClick={() => handleDetails(item)} className="">
              <Image
                src={item.image}
                alt={item.title || "Course Image"}
                priority
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
            </div>

            <div className="">
              <button
                type="button"
                disabled={!!(isInCart(item.id) && loggedUser[0]?.username)}
                className={`text-white mx-auto mb-5 px-2 py-2 font-semibold w-1/2 
             ${
               isInCart(item.id) && loggedUser[0]?.username
                 ? "bg-blue-400 cursor-not-allowed"
                 : "bg-blue-500 cursor-pointer"
             }
           `}
                onClick={() => addCartData(item)}
              >
                {isInCart(item.id) ? "Added to Cart" : "Add To Cart"}
              </button>

              <button
                type="button"
                disabled={!!(isInWishlist(item.id) && loggedUser[0]?.username)}
                className={`text-white mx-auto mb-5 px-2 py-2 font-semibold w-1/2  
               ${
                 isInWishlist(item.id) && loggedUser[0]?.username
                   ? "bg-gray-400 cursor-not-allowed"
                   : "bg-gray-800 cursor-pointer"
               }
              `}
                onClick={() => addWishlists(item)}
              >
                {isInWishlist(item.id)
                  ? "Added to wishlist"
                  : "Add to wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {pathname === "/product" && (
        <div className="mt-8">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            // breakLabel={"..."}
            pageCount={pageCount}
            // marginPagesDisplayed={2}
            // pageRangeDisplayed={3}
            forcePage={currentPage}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center space-x-2"
            pageClassName="px-4 py-2 border rounded hover:bg-gray-200"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-4 py-2 border rounded hover:bg-gray-200"
            nextClassName="px-4 py-2 border rounded hover:bg-gray-200"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default Card;
