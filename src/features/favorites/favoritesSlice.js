import { createSlice } from "@reduxjs/toolkit";

const getUserFavorites = (userId) => {
    const data = localStorage.getItem(`favorites_${userId}`);
    return data ? JSON.parse(data) : [];
};
const initialState = {
    userID: localStorage.getItem("userId") || null,
    favorites: getUserFavorites(localStorage.getItem("userId") || null),
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userID = action.payload;
            localStorage.setItem("userId", action.payload);
            state.favorites = getUserFavorites(action.payload);
        },
        addFavorite: (state, action) => {
            const found = state.favorites.find((movie) => movie.id === action.payload.id);
            if (!found) {
                state.favorites.push(action.payload);
                localStorage.setItem(`favorites_${state.userID}`, JSON.stringify(state.favorites));
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(
                (movie) => movie.id !== action.payload
            );
            localStorage.setItem(`favorites_${state.userID}`, JSON.stringify(state.favorites));
        },
    },
});

export const { setUserId, addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;

