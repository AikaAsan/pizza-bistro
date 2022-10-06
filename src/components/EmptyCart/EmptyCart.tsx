import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from '../../assets/img/empty-cart.png';

const EmptyCart: React.FC = () => {
    return (
        <div className='cart cart--empty'>
            <h2>
                Cart is empty <span> 😕</span>
            </h2>
            <p>To order pizza go to home page</p>
            <img src={emptyCartImg} alt='Empty cart' />
            <Link to='/' className='button button--black'>
                <span>Go back</span>
            </Link>
        </div>
    );
};

export default EmptyCart;
