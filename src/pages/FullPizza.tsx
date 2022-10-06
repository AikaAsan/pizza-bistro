import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

const FullPizza: React.FC = () => {
    const [pizzaItem, setPizzaItem] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizzaItem() {
            try {
                const { data } = await axios.get(
                    'https://632c9d085568d3cad8897bbb.mockapi.io/items/' + id
                );
                setPizzaItem(data);
            } catch (error) {
                alert('something went wrong');
                navigate('/');
            }
        }
        fetchPizzaItem();
    }, [id]);

    if (!pizzaItem) {
        return <>'Loading...'</>;
    }

    return (
        <div className='container'>
            {' '}
            <img src={pizzaItem.imageUrl} alt={pizzaItem.title} />
            <h2>{pizzaItem.title} pizza</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum, quae quas labore assumenda fugit aperiam molestiae
                distinctio odio sapiente voluptate!
            </p>{' '}
            <h4>{pizzaItem.price}CAD</h4>
        </div>
    );
};

export default FullPizza;
