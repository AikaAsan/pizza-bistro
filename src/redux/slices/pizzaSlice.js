import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async (params, thunkAPI) => {
        const { category, sortOption, search, currentPage } = params;
        console.log(thunkAPI);
        const url = `https://632c9d085568d3cad8897bbb.mockapi.io/items?${category}&sortBy=${sortOption}${search}&page=${currentPage}&limit=4`;
        console.log('url:', url);

        const { data } = await axios.get(url);

        return data;
    }
);

const initialState = {
    pizzas: [],
    status: 'loading',
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            state.pizzas = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                console.log('loading');
                state.status = 'loading';
                state.pizzas = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                console.log('success');
                state.pizzas = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                console.log('something went wrong');
                state.status = 'error';
                state.pizzas = [];
            });
    },
    // extraReducers: {
    //     [fetchPizzas.peniding]: (state, action) => {
    //         console.log('loading');
    //         state.status = 'loading';
    //         state.pizzas = [];
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         console.log('success');
    //         state.pizzas = action.payload;
    //         state.status = 'success';
    //     },
    //     [fetchPizzas.rejected]: (state, action) => {
    //         console.log('something went wrong');
    //         state.status = 'error';
    //         state.pizzas = [];
    //     },
    // },
});

export const selectPizzaData = (state) => state.pizza;
export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
