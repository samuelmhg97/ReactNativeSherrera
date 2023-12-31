import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import shopReducer from "../Features/Shop/shopSlice"
import counterReducer from "../Features/Counter/contadorSlice"
import cartReducer from "../Features/Cart/cartSlice"
import userReducer from "../Features/User/userSlice"
import { shopApi } from "../Services/shopServices";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../Services/authServices";
import orderReducer from "../Features/OrderSlice/orderSlice"
const store =  configureStore({
    reducer: {
        counterReducer,
        shopReducer,
        cartReducer,
        userReducer,
        orderReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware)
    
})

setupListeners(store.dispatch)

export default store