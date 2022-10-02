import { configureStore } from '@reduxjs/toolkit';
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
