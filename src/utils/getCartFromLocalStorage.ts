import { TCartItem } from '../redux/slices/cartSlice';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('items');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
        items: items as TCartItem[],
        totalPrice,
    };
};
