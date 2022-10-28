import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { RootState } from '../store';

export type TCartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    size: string;
    crustType: string;
    count: number;
    toppings: string;
};

interface cartSliceState {
    totalPrice: number;
    cartItems: TCartItem[];
}

const initialState: cartSliceState = getCartFromLocalStorage();
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<TCartItem>) => {
            const findItem = state.cartItems.find(
                (obj) => obj.id === action.payload.id
            );

            if (findItem) {
                findItem.count++;
            } else {
                state.cartItems.push({ ...action.payload, count: 1 });
            }
            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                return Number((obj.price * obj.count + sum).toFixed(3));
            }, 0);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                return Number((obj.price * obj.count + sum).toFixed(3));
            }, 0);
        },
        decrementPizzaCount: (state, action: PayloadAction<string>) => {
            const findItem = state.cartItems.find(
                (obj) => obj.id === action.payload
            );
            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                return Number((obj.price * obj.count + sum).toFixed(3));
            }, 0);
        },
        clearItems: (state) => {
            state.cartItems = [];
            state.totalPrice = 0;
        },
    },
});
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.cartItems.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, decrementPizzaCount } =
    cartSlice.actions;

export default cartSlice.reducer;
