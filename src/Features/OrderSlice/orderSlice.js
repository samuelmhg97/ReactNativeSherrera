
import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "Orders",
    initialState: {
        value: {
            orders: [],
        }
    },
    reducers: {
        setOrders: (state, action ) => {
            state.value.orders = action.payload
        },
        clearOrders: (state) => {
            state.value.orders = []
        }
    }
})

export const {setOrders, clearOrders} = orderSlice.actions

export default orderSlice.reducer