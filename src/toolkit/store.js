import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsInCartReducer } from "./slices/cartSlice";
import { haveCheckboxReducer } from "./slices/haveCheckboxSlice";
import { searchReducer } from "./slices/searchSlice";

const mainReducer = combineReducers({
    productsInCart: productsInCartReducer,
    search: searchReducer,
    haveCheckbox: haveCheckboxReducer

})

export const store = configureStore({
    reducer: mainReducer,
    devTools: true,
});

store.subscribe(() => {
    window.localStorage.setItem('allState', JSON.stringify(store.getState()))
})
