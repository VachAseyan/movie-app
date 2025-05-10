import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title: string;
  
}

interface FavoritesState {
  userID: string | null;
  favorites: Movie[];
}

const getUserFavorites = (userId: string | null): Movie[] => {
  if (!userId) return [];
  const data = localStorage.getItem(`favorites_${userId}`);
  return data ? JSON.parse(data) : [];
};

const initialState: FavoritesState = {
  userID: localStorage.getItem("userId"),
  favorites: getUserFavorites(localStorage.getItem("userId")),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
      localStorage.setItem("userId", action.payload);
      state.favorites = getUserFavorites(action.payload);
    },
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const found = state.favorites.find((movie) => movie.id === action.payload.id);
      if (!found) {
        state.favorites.push(action.payload);
        localStorage.setItem(`favorites_${state.userID}`, JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((movie) => movie.id !== action.payload);
      localStorage.setItem(`favorites_${state.userID}`, JSON.stringify(state.favorites));
    },
  },
});

export const { setUserId, addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
