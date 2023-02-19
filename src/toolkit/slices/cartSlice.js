import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "../initialState";

const cartSlice = createSlice({
    name: 'cart',
    initialState: getInitialState().productsInCart,

    reducers: {

        deleteProductInCart(state, action) {
            return state.filter(product => product._id !== action.payload)
        },

        clearCart() {
            return []
        },

        addInCart(state, action) {
            const id = action.payload;
            // if (state.length == 0) {
            //     state.push({id:action.payload, count:1})
            // }

            for (let i = 0; i < state.length; i++) {
                if (id == state[i].id) {
                    state[i].count++;

                    return;
                }
            }

            state.push({ id: action.payload, count: 1 })



        }
    }
})

export const { deleteProductInCart, clearCart, addInCart } = cartSlice.actions;

export const getCartSelector = (state) => state.productsInCart;

export const productsInCartReducer = cartSlice.reducer
