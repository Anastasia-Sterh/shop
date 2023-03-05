import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "../initialState";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: getInitialState().favorites,

  reducers: {
    deleteProductFromFavorites(state, action) {
      return state.filter((id) => action.payload !== id);
    },

    clearFavorites() {
      return [];
    },

    addInFavorites(state, action) {
      const id = action.payload;
      for (let i = 0; i < state.length; i++) {
        if (id == state[i]) {
          return;
        }
      }

      state.push(id);
    },
  },
});

export const {
  deleteProductFromFavorites,
  clearFavorites,
  addInFavorites,
  toggleSelectAll,
} = favoritesSlice.actions;

export const getFavoritesSelector = (state) => state.favorites;

export const favoritesReducer = favoritesSlice.reducer;
