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
    toppings: string[];
};
type TCartItemDec = {
    id: string;
    size: string;
    crustType: string;
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
                (obj) =>
                    obj.id === action.payload.id &&
                    obj.size === action.payload.size &&
                    obj.crustType === action.payload.crustType
                // obj.title === action.payload.title &&
                // obj.size === action.payload.size
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
        removeItem: (state, action: PayloadAction<TCartItemDec>) => {
            state.cartItems = state.cartItems.filter(
                (item) =>
                    !(
                        item.id === action.payload.id &&
                        item.size === action.payload.size &&
                        item.crustType === action.payload.crustType
                    )
            );
            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                return Number((obj.price * obj.count + sum).toFixed(3));
            }, 0);
        },
        decrementPizzaCount: (state, action: PayloadAction<TCartItemDec>) => {
            const findItem = state.cartItems.find(
                (obj) =>
                    obj.id === action.payload.id &&
                    obj.size === action.payload.size &&
                    obj.crustType === action.payload.crustType
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

export const selectCartItems = (id: string) => (state: RootState) =>
    state.cart.cartItems.reduce((acc, rec) => {
        return rec.id === id ? acc + rec.count : acc;
    }, 0);
// export const selectCartItemByTitle = (title: string) => (state: RootState) =>
//     state.cart.cartItems.find((obj) => obj.title === title);

export const { addItem, removeItem, clearItems, decrementPizzaCount } =
    cartSlice.actions;

export default cartSlice.reducer;
