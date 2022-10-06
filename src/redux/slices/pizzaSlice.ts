import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchPizzasArgs = {
    category: string;
    sortOption: string;
    search: string;
    currentPage: number;
};
export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
    'pizza/fetchPizzas',
    async (params) => {
        const { category, sortOption, search, currentPage } = params;

        const url = `https://632c9d085568d3cad8897bbb.mockapi.io/items?${category}&sortBy=${sortOption}${search}&page=${currentPage}&limit=4`;
        console.log('url:', url);

        const { data } = await axios.get<Pizza[]>(url);

        return data;
    }
);

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: string[];
    types: number[];
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
interface PizzaSliceState {
    pizzas: Pizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    pizzas: [],
    status: Status.LOADING,
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas: (state, action: PayloadAction<Pizza[]>) => {
            state.pizzas = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                console.log('loading');
                state.status = Status.LOADING;
                state.pizzas = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                console.log('success');
                state.pizzas = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                console.log('something went wrong');
                state.status = Status.ERROR;
                state.pizzas = [];
            });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
