import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
import searchSlice from '../features/search/searchSlice';

export const store = configureStore({
    reducer: combineReducers({
        auth: authSlice.reducer,
        search: searchSlice,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
