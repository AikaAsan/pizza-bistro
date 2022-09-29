import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setSortOption } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import ActiveSortOptionContext from '../store/ActiveSortOptionContext';
// import SearchValueContext from '../store/SearchValueContext';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { categoryId, sortOption, currentPage } = useSelector(
        (state) => state.filter
    );
    const { searchValue } = useSelector((state) => state.search);

    const dispatch = useDispatch();

    const renderedItems = pizzas
        .filter((obj) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
            return false;
        })
        .map((pizzaItem) => {
            return <PizzaBlock {...pizzaItem} key={pizzaItem.id} />;
        });
    const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `search=${searchValue}` : '';

    const categoryIdHandler = (index) => {
        dispatch(setCategoryId(index));
    };

    const sortOptionHandler = (sortProperty) => {
        // setSortOption(sortProperty);
        dispatch(setSortOption(sortProperty));
        console.log('sortProperty:', sortProperty);
    };

    const fetchPizzaHandler = async () => {
        setIsLoading(true);
        try {
            const url = `https://632c9d085568d3cad8897bbb.mockapi.io/items?${category}&sortBy=${sortOption}&${search}&page=${currentPage}&limit=3`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();

            if (data) {
                setPizzas(data);
                // setTotalPages(Math.ceil(data.length / 3));
            }
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchPizzaHandler();
        window.scrollTo(0, 0);
    }, [categoryId, sortOption, searchValue, currentPage]);
    return (
        <div className='container'>
            <div className='content__top'>
                <ActiveSortOptionContext.Provider
                    value={{
                        categoryId,
                        sortOption,
                        categoryIdHandler,
                        sortOptionHandler,
                    }}
                >
                    <Categories />
                    <Sort />
                </ActiveSortOptionContext.Provider>
            </div>
            <h2 className='content__title'>All Pizzas</h2>
            <div className='content__items'>
                {isLoading ? skeletons : renderedItems}
            </div>
            <Pagination />
        </div>
    );
};

export default Home;
