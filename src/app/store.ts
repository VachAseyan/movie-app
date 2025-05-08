import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import searchSlice from '../features/search/searchSlice';
import favoritesSlice from '../features/favorites/favoritesSlice';

export const store = configureStore({
    reducer: combineReducers({
        auth: authSlice,
        search: searchSlice,
        favorites: favoritesSlice,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
