import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "../initialState";

export const searchSlice = createSlice({
    name: "search",
    initialState: getInitialState().search,
    reducers: {
        changeSearch(state, action) {
            state.search = action.payload
        },
    }
})

export const { changeSearch } = searchSlice.actions;

export const getSearchSelector = (state) => state.search.search;

export const searchReducer = searchSlice.reducer;
