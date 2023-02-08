import { configureStore } from "@reduxjs/toolkit";
 
import loaderSlice from "./loaderSlice";

const store = configureStore({
    reducer: {
        loaderSlice
    }
})

export default store;