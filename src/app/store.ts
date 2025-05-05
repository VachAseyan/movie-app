import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '../features/counter/counterSlice';
import { authSlice } from '../features/auth/authSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
