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

interface ProductProps {
  products: Data[];
}


// const cartData = window.localStorage.getItem('cart');
// const fetchData:Data[] = cartData ? JSON.parse(cartData) : [];

const initialState: ProductProps = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Data>) {
      state.products.push(action.payload); 
      window.localStorage.setItem('cart', JSON.stringify(state.products))
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      window.localStorage.setItem('cart', JSON.stringify(state.products))
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
