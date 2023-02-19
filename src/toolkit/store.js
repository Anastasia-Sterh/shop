import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsInCartReducer } from "./slices/cartSlice";
import { searchReducer } from "./slices/searchSlice";

const mainReducer = combineReducers({
    productsInCart: productsInCartReducer,
    search: searchReducer,

})

export const store = configureStore({
    reducer: mainReducer,
    devTools: true,
});

store.subscribe(() => {
    window.localStorage.setItem('productsInCart', JSON.stringify(store.getState()))
})
