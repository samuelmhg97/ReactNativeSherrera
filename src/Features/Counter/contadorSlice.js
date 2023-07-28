import {createSlice} from "@reduxjs/toolkit"

export const contadorSlice = createSlice({
    name: "counter",
    initialState: {
        value: 20
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
         decrement: state => {
            state.value -= 1
         },
         incrementByAmount: (state, action) => {
            state.value += action.payload
         }
    }
})

export const {increment, decrement, incrementByAmount} = contadorSlice.actions

export default contadorSlice.reducer