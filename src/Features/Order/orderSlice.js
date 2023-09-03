import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    deleteOrder: (state, action) => {
      const orderId = action.payload;
      state.value.orders = state.orders.filter((order) => order.id !== orderId);
    },
  },
});

export const { setOrders, deleteOrder } = orderSlice.actions;

export default orderSlice.reducer;
