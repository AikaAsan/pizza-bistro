import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    setCategoryId,
    setSortOption,
    setFilters,
    selectFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import qs from 'qs';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import ActiveSortOptionContext from '../store/ActiveSortOptionContext';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
    const { categoryId, sortOption, currentPage } = useSelector(selectFilter);
    const { searchValue } = useSelector((state) => state.search);
    const { pizzas, status } = useSelector((state) => state.pizza);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

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
    const search = searchValue.length > 0 ? `&search=${searchValue}` : '';

    const categoryIdHandler = (index) => {
        dispatch(setCategoryId(index));
    };

    const sortOptionHandler = (sortProperty) => {
        dispatch(setSortOption(sortProperty));
    };

    const fetchPizzaHandler = async () => {
        dispatch(fetchPizzas({ category, sortOption, search, currentPage }));

        window.scrollTo(0, 0);
    };

    // if dependecies changed and there was first render
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId: categoryId,
                sortOption: sortOption,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortOption, currentPage]);

    // if first render -> we check URL parameters and save them in Redux state
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            dispatch(setFilters({ ...params })); //why I have to do spread

            isSearch.current = true;
        }
    }, []);

    // if first render -> fetch pizzas
    useEffect(() => {
        if (!isSearch.current) {
            fetchPizzaHandler();
        }
        isSearch.current = false;
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
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>Uh-Oh! Something went wrong😕</h2>
                </div>
            ) : (
                <div className='content__items'>
                    {status === 'loading' ? skeletons : renderedItems}
                </div>
            )}
            <Pagination />
        </div>
    );
};

export default Home;
