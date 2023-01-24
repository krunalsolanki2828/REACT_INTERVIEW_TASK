import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsSlice from "./productsSlice";

// set up on configureStore
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products:productsSlice
    }
})