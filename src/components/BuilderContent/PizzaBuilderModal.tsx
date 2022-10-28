import React from 'react';

const PizzaBuilderModal: React.FC = () => {
    return (
        <div>
            <div>Picture Placeholder</div>
            <div>
                <h4>Build You Own Pizza</h4>
                <span>Pizza dimensions</span>
                <p>what goes inside the pizza </p>
                <div>
                    <button>26 in</button>
                    <button>30 in</button>
                    <button>40 in</button>
                </div>
                <div>
                    <div>
                        <h5>Toppings Addition</h5>
                    </div>
                    <form action=''>
                        <input type='check' />
                        <label htmlFor=''>Topping 1</label>
                        <br />
                        <input type='check' />
                        <label htmlFor=''>Topping 2</label>
                        <br />
                        <input type='check' />
                        <label htmlFor=''>Topping 3</label>
                        <br />
                        <input type='submit' value='submit' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PizzaBuilderModal;
