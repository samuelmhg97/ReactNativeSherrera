import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../Features/Shop/shopSlice"
import counterReducer from "../Features/Counter/contadorSlice"

export default configureStore({
    reducer: {
        counterReducer,
        shopReducer
    }
})