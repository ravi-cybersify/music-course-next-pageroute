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
  }

export interface ProductProps {
  products: Data[];
  wishlist: Data[];
}

let fetchData:Data[] = [];
if(typeof window !== 'undefined'){
  const cartData = window.localStorage.getItem('cart');
  fetchData = cartData ? JSON.parse(cartData) : [];
}

const initialState: ProductProps = {
  products: fetchData || [],
  wishlist: []
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Data>) {
      state.products.push(action.payload); 
      window.localStorage.setItem('cart', JSON.stringify(state.products))
    },
    addWishlist(state,action: PayloadAction<Data>){
        state.wishlist.push(action.payload);
        window.localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      window.localStorage.setItem('cart', JSON.stringify(state.products))
    },
  },
});

export const { addProduct,addWishlist, removeProduct } = productSlice.actions;

export default productSlice.reducer;
