import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice"
import userSlice from "./userSlice"


const store  = configureStore({
    reducer: {
        product : productSlice,
        user : userSlice
    },
})

export default store;