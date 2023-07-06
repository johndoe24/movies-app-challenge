import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./features/favorites/FavoriteList";

export default configureStore({
  reducer: {
    favoriteShows: favoritesReducer,
  },
});
