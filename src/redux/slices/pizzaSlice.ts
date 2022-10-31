import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchPizzasArgs = {
    category: string;
    sortBy: string;
    search: string;
    currentPage: number;
};
export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
    'pizza/fetchPizzas',
    async (params) => {
        const { category, sortBy, search, currentPage } = params;

        const url = `https://pizza-bistro-backend.herokuapp.com/?${category}sortBy=${sortBy}${search}&page=${currentPage}`;

        const { data } = await axios.get<Pizza[]>(url);

        console.log('data:', data);
        return data;
    }
);

type Pizza = {
    id: string;
    title: string;
    price: {
        small: number;
        medium: number;
        large: number;
    };

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
                state.status = Status.LOADING;
                state.pizzas = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR;
                state.pizzas = [];
            });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
