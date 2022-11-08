import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, TCartItem } from '../../redux/slices/cartSlice';
import classes from './PizzaBuilderModal.module.scss';
import pizzaPicture from '../../assets/img/pexels-polina-tankilevitch-pizza.jpeg';

const PizzaBuilderModal: React.FC = () => {
    const pizzaSizes = [
        { size: 'Small', price: 15.99 },
        { size: 'Medium', price: 16.99 },
        { size: 'Large', price: 17.99 },
    ];
    const crustTypes = ['Original Crust', 'Thin Crust'];
    const pizzaSauces = ['Classic Red', 'White Cream', 'Basil Pesto Blend'];
    const toppings = [
        'Pineapple',
        'Pepperoni',
        'Chicken',
        'Red Onions',
        'Mushrooms',
        'Bacon',
        'Peppers',
        'Extra Cheese',
        'Garlic',
    ];
    const [pizzaPrice, setPizzaPrice] = useState<number>(15.99);
    const [pizzaSize, setPizzaSize] = useState<string>('Small');
    const [pizzaCrust, setPizzaCrust] = useState<string>('Original Crust');
    const [sauce, setSauce] = useState<string>('Classic Red');
    const [pizzaToppings, setPizzaToppings] = useState<string[]>([]);
    const [isItemSelected, setisItemSelected] = useState<number>(0);

    const dispatch = useDispatch();

    const addToppingHandler = (item: string) => {
        setPizzaToppings([...pizzaToppings, item]);
    };

    const removeToppingHandler = (item: string) => {
        setPizzaToppings(pizzaToppings.filter((topping) => topping !== item));
    };

    const onSelection = (
        item: any,
        current: any,
        setFunc: (arg0: string) => void,
        validateFunc: (arg0: number) => void,
        pizzaPrice?: any,
        setPizzaPrice?: (arg0: number) => void
    ) => {
        if (current === item) {
            validateFunc(0);
        } else {
            setFunc(item);
            validateFunc(1);
            setPizzaPrice?.(pizzaPrice);
        }
    };

    const onToppingsSelection = (
        item: string,
        pizzaToppings: string[],
        setFunc: (arg0: string) => void,
        pizzaPrice: number,
        setPizzaPrice: (arg0: number) => void
    ) => {
        if (pizzaToppings.includes(item)) {
            removeToppingHandler(item);
            setPizzaPrice(Number((pizzaPrice - 2).toFixed(2)));
        } else {
            setFunc(item);
            setPizzaPrice(Number((pizzaPrice + 2).toFixed(2)));
        }
    };

    const addToCartHandler = () => {
        const constructorPizzaId = Math.random().toString(16).slice(2);

        const item: TCartItem = {
            id: constructorPizzaId,
            title: 'Create Your Own Pizza',
            price: pizzaPrice,
            imageUrl:
                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg',
            size: pizzaSize,
            crustType: pizzaCrust,
            count: 0,
            toppings: pizzaToppings,
        };
        dispatch(addItem(item));
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.image}>
                <img src={pizzaPicture} alt='pizza' />
            </div>
            <div className={classes.contentPlaceholder}>
                <div className={classes.textGroup}>
                    <p className={classes.grayColor}>
                        Create your own pizza by choosing a crust, sauce and
                        toppings! Select from three crust sizes & thincknesses,
                        choice of sauce over 10 individual toppings
                    </p>
                    <p>
                        Pizza comes with Cheese already and you can select the
                        rest of your Toppings.
                    </p>
                </div>
                <div className={classes.toppingSizesGroup}>
                    <div className={classes.scrollGroup}>
                        <div className={classes.size}>
                            <p className={classes.grayColor}>Size</p>
                            <div className={classes.sizeContainer}>
                                {pizzaSizes.map((size, index) => (
                                    <button
                                        className={
                                            pizzaSize === size.size
                                                ? classes.activeButton
                                                : ''
                                        }
                                        key={index}
                                        onClick={() =>
                                            onSelection(
                                                size.size,
                                                pizzaSize,
                                                setPizzaSize,
                                                setisItemSelected,
                                                size.price,
                                                setPizzaPrice
                                            )
                                        }
                                    >
                                        <span>{size.size}</span>
                                        <span>{size.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={classes.crust}>
                            <p className={classes.grayColor}>Crust</p>
                            <div className={classes.crustContainer}>
                                {crustTypes.map((crustType, index) => (
                                    <button
                                        className={
                                            pizzaCrust === crustType
                                                ? classes.activeButton
                                                : ''
                                        }
                                        key={index}
                                        onClick={() =>
                                            onSelection(
                                                crustType,
                                                pizzaCrust,
                                                setPizzaCrust,
                                                setisItemSelected
                                            )
                                        }
                                    >
                                        <span>{crustType}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={classes.sauce}>
                            <p className={classes.grayColor}>Sauce</p>
                            <div className={classes.sizeContainer}>
                                {pizzaSauces.map((pizzaSauce, index) => (
                                    <button
                                        className={
                                            sauce === pizzaSauce
                                                ? classes.activeButton
                                                : ''
                                        }
                                        key={index}
                                        onClick={() =>
                                            onSelection(
                                                pizzaSauce,
                                                sauce,
                                                setSauce,
                                                setisItemSelected
                                            )
                                        }
                                    >
                                        <span>{pizzaSauce}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={classes.topping}>
                            <p className={classes.grayColor}>Toppings</p>
                            <div className={classes.toppingsContainer}>
                                {toppings.map((topping, index) => (
                                    <button
                                        className={
                                            pizzaToppings.includes(topping)
                                                ? classes.activeButton
                                                : ''
                                        }
                                        key={index}
                                        onClick={() =>
                                            onToppingsSelection(
                                                topping,
                                                pizzaToppings,
                                                addToppingHandler,
                                                pizzaPrice,
                                                setPizzaPrice
                                            )
                                        }
                                    >
                                        <span>{topping}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={classes.addToCartButton}>
                            <button
                                className={classes.addToCart}
                                onClick={addToCartHandler}
                            >
                                <p>Add To Cart</p>
                                <p>${pizzaPrice}</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaBuilderModal;
