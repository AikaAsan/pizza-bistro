import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import axios from "axios";

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
                    `https://pizza-bistro-backend.onrender.com/pizza/${id}`
                );
                setPizzaItem(data);
            } catch (error) {
                alert("something went wrong");
                navigate("/");
            }
        }
        fetchPizzaItem();
    }, [id, navigate]);

    if (!pizzaItem) {
        return <>'Loading...'</>;
    }

    return (
        <div className="full-pizza">
            {" "}
            <img src={pizzaItem.imageUrl} alt={pizzaItem.title} />
            <h2>{pizzaItem.title} pizza</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum, quae quas labore assumenda fugit aperiam molestiae
                distinctio odio sapiente voluptate!
            </p>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Go Back</span>
                </button>
            </Link>
        </div>
    );
};

export default FullPizza;
