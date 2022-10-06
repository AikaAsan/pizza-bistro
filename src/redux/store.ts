import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import pizzaSlice from './slices/pizzaSlice';
import searchSlice from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        search: searchSlice,
        cart: cartSlice,
        pizza: pizzaSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
