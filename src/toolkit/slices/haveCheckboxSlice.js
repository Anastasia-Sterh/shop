import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "../initialState";

const haveCheckboxSlice = createSlice({
    name: 'haveCheckbox',
    initialState: getInitialState().haveCheckbox,

    reducers: {
        toggleCheckbox(state, action) {
            const id = action.payload;
            if (state.includes(id) == true) {
                return state.filter(ID => id !== ID)
            } else {
                state.push(id)

            }
        },

        toggleSelectAll(state, action) {
            const idsInCart = action.payload;

            let isAllProductsChecked = idsInCart.every(function (idInCart) {
                if (state.includes(idInCart)) {
                    return true;
                } else {
                    return false;
                }
            });

            if (isAllProductsChecked == true) {
                return [];
            } else {
                for (let id of idsInCart) {
                    if (!state.includes(id)) {
                        state.push(id)
                    }
                }
            }
        }


    }
}
)

export const { toggleCheckbox, toggleSelectAll } = haveCheckboxSlice.actions;

export const getHaveCheckboxSelector = (state) => state.haveCheckbox;

export const haveCheckboxReducer = haveCheckboxSlice.reducer
