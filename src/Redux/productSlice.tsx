import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Data {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    instructor: string;
    isFeatured: boolean;
    image: string;
    quantity: number;
  }

export interface ProductProps {
  [userId:string]: Data[];
  wishlist: Data[];
}

let fetchData:Data[] = [];
if(typeof window !== 'undefined'){
  const cartData = window.localStorage.getItem('cart');
  fetchData = cartData ? JSON.parse(cartData) : [];
}
let wishlistData:Data[] = [];
if(typeof window !== 'undefined'){
  const listData = window.localStorage.getItem('wishlist');
  wishlistData = listData ? JSON.parse(listData) : [];
}

const initialState: ProductProps = {
  carts: fetchData || [],
  wishlist: wishlistData || [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // addCart(state, action: PayloadAction<{userId:string, item:Data}>) {
    //   const { userId, item } = action.payload;
    //   if (!state[userId]) {
    //     state[userId] = [];
    //   }
    //   state[userId].push(item);
    //   window.localStorage.setItem(`${userId}`, JSON.stringify(state[userId]))
    // },

    addCart(state, action: PayloadAction<Data>) {
      state.carts.push(action.payload);
      window.localStorage.setItem("cart", JSON.stringify(state.carts));
    },
   
    addWishlist(state,action: PayloadAction<Data>){
        state.wishlist.push(action.payload);
        window.localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
    },
    removeWishlist(state, action: PayloadAction<number>) {
      state.wishlist = state.wishlist.filter(
        (wishlist) => wishlist.id !== action.payload
      );
      window.localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
    },
    removeCart(state, action: PayloadAction<number>) {
      state.carts = state.carts.filter(
        (product) => product.id !== action.payload
      );
      window.localStorage.setItem('cart', JSON.stringify(state.carts))
    },
    updateIncQuantiy(state,action:PayloadAction<{ id: number; quantity: number }>){
      const { id, quantity } = action.payload;
      const item = state.carts.find(item=> item.id === id)
      if(item){
        item.quantity = quantity ;
        // item.price = quantity * item.price;
      }
    },
    updateDecQuantiy(state,action:PayloadAction<{ id: number; quantity: number }>){
      const { id, quantity } = action.payload;
      const item = state.carts.find(item=> item.id === id)
      if(item){
        item.quantity = quantity ;
        // item.price = quantity * item.price;
      }
    },
    
  },
});

export const { addCart,addWishlist,removeWishlist, removeCart,updateIncQuantiy,updateDecQuantiy } = productSlice.actions;

export default productSlice.reducer;
