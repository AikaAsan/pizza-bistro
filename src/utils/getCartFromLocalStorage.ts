import { TCartItem } from '../redux/slices/cartSlice';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('cartItems');
    const cartItems = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(cartItems);

    return {
        cartItems: cartItems as TCartItem[],
        totalPrice,
    };
};
