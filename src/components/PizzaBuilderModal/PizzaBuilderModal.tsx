import React, { ReactEventHandler, useState } from 'react';
import classes from './PizzaBuilderModal.module.scss';
const PizzaBuilderModal: React.FC = () => {
    const pizzaSizes = ['Small', 'Medium', 'Large'];
    const pizzaSauces = ['Classic Red', 'White Cream', 'Basil Pesto Blend'];

    type TConstructorPizza = {
        title: string;
        price: number;
        size: string;
        crustType: string;
        toppings: string;
    };

    const [form, setForm] = useState<TConstructorPizza>({
        title: 'Build Your Own Pizza',
        price: 10,
        size: '',
        crustType: '',
        toppings: '',
    });

    // const onChange: ReactEventHandler<HTMLInputElement> = (event) => {
    //     const { value, name } = event.target;
    //     console.log(event.target);
    // };

    const [checked, setChecked] = useState(false);

    return (
        <div className={classes.wrapper}>
            <div className={classes.image}>Picture Placeholder</div>
            <div className={classes.content}>
                {/* <h4>Build You Own Pizza</h4>
                <p>
                    Show your creativeness on our Hand-stretched 10" Pizza which
                    comes with Cheese already and you can select the rest of
                    your Toppings.{' '}
                </p>
                <span>Pizza dimensions</span> */}
                <div className={classes}>
                    <form action=''>
                        <h5>Select Size</h5>
                        <div className={classes.pizzaSizeDiv}>
                            {pizzaSizes.map((pizzaSize) => {
                                return (
                                    <div key={pizzaSize}>
                                        <label htmlFor=''>
                                            <input
                                                type='radio'
                                                value={pizzaSize}
                                                className={
                                                    classes.formCheckInput
                                                }
                                                onChange={() =>
                                                    setChecked(!checked)
                                                }
                                            />
                                            {pizzaSize}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>

                        <h5>Select Sauce</h5>
                        <div>
                            {pizzaSauces.map((pizzaSauce, index) => {
                                return (
                                    <div key={pizzaSauce}>
                                        <input type='radio' />
                                        <label htmlFor=''>{pizzaSauce}</label>
                                    </div>
                                );
                            })}
                        </div>

                        <input type='radio' />
                        <label htmlFor=''>Topping 1</label>
                        <br />
                        <input type='submit' value='submit' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PizzaBuilderModal;
