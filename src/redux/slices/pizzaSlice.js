import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pizzas: [],
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            console.log('action:', action);
            state.pizzas = action.payload;
        },
    },
});
