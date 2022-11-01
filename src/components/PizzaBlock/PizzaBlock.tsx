import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    addItem,
    TCartItem,
    selectCartItemById,
} from '../../redux/slices/cartSlice';

type PizzaBlockProps = {
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

// type cartItem = {
//     title: string;
//     price: number;
//     imageUrl: string;
//     size: string;
//     crustType: string;
//     count: number;
//     toppings: string;
// };
const crustTypes: string[] = ['Thin Crust', 'Original'];

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
    id,
    title,
    price,
    imageUrl,
    sizes,
    types,
}) => {
    const [activeCrustType, setActiveCrustType] = useState(0);
    const [activeCrustSize, setActiveCrustSize] = useState(0);

    const pizzaPriceHandler = () => {
        if (activeCrustSize === 0) {
            return price.small;
        } else if (activeCrustSize === 1) {
            return price.medium;
        } else if (activeCrustSize === 2) {
            return price.large;
        }
    };
    const pizzaPrice: number = pizzaPriceHandler() ?? 0;
    const cartItem = useSelector(selectCartItemById(id));

    const addedCount = cartItem ? cartItem.count : 0;

    const dispatch = useDispatch();

    const onClickHandler = () => {
        // const cartItemId: string = (Math.random() * 100).toString();

        const item: TCartItem = {
            id,
            title,
            price: pizzaPrice,
            imageUrl,
            size: sizes[activeCrustSize],
            crustType: crustTypes[activeCrustType],
            count: 0,
            toppings: '',
        };
        dispatch(addItem(item));
    };

    return (
        <div className='pizza-block-wrapper'>
            <div className='pizza-block'>
                <Link to={`/pizza/${id}`}>
                    <img
                        className='pizza-block__image'
                        src={imageUrl}
                        alt='Pizza'
                    />
                    <h4 className='pizza-block__title'>{title}</h4>
                </Link>
                <div className='pizza-block__selector'>
                    <ul>
                        {types.map((type, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => setActiveCrustType(type)}
                                    className={
                                        index === activeCrustType
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    {crustTypes[type]}
                                </li>
                            );
                        })}
                    </ul>
                    <ul>
                        {sizes.map((size, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => setActiveCrustSize(index)}
                                    className={
                                        activeCrustSize === index
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    {size}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className='pizza-block__bottom'>
                    <div className='pizza-block__price'> ${pizzaPrice}</div>
                    <button
                        onClick={onClickHandler}
                        className='button button--outline button--add'
                    >
                        <svg
                            width='12'
                            height='12'
                            viewBox='0 0 12 12'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                                fill='white'
                            />
                        </svg>
                        <span>Add</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};
