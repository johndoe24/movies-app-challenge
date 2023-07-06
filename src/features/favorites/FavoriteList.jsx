import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favoriteShows",
  initialState: {
    value: localStorage.getItem("reduxState")
      ? JSON.parse(localStorage.getItem("reduxState"))
      : [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem("reduxState", JSON.stringify(state.value));
    },
    removeFavorite: (state, action) => {
      state.value = state.value.filter((item) => item.id != action.payload.id);
      localStorage.setItem("reduxState", JSON.stringify(state.value));
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
