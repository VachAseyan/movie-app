import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

interface FavoritesState {
    movies: Movie[];
}

const initialState: FavoritesState = {
    movies: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<Movie>) => {
            if (!state.movies.some(movie => movie.id === action.payload.id)) {
                state.movies.push(action.payload);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<number>) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer; 