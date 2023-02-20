import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "../initialState";

const cartSlice = createSlice({
    name: 'cart',
    initialState: getInitialState().productsInCart,

    reducers: {

        deleteProductInCart(state, action) {
            return state.filter(product => action.payload !== product.id)
        },

        clearCart() {
            return []
        },

        changeCount(state, action) {
            const idAndValue = action.payload;
            if (idAndValue.value < 0) {
                return state.filter(product => idAndValue.id !== product.id)
            }
            for (let product of state) {
                if (product.id == idAndValue.id) {
                    product.count = idAndValue.value;
                }

            }
        },

        addInCart(state, action) {
            const id = action.payload;
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

export const { deleteProductInCart, clearCart, addInCart, changeCount } = cartSlice.actions;

export const getCartSelector = (state) => state.productsInCart;

export const productsInCartReducer = cartSlice.reducer
