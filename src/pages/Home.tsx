import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import qs from 'qs';
import {
    setCategoryId,
    setsortBy,
    setFilters,
    selectFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import {
    Categories,
    Sort,
    PizzaBlock,
    Skeleton,
    Pagination,
    // PizzaBuilder,
} from '../components';
import PizzaBuilder from '../components/PizzaBuilder/PizzaBuilder';

const Home = () => {
    const { categoryId, sortBy, currentPage } = useSelector(selectFilter);
    const { searchValue } = useSelector((state: any) => state.search);
    const { pizzas, status } = useSelector(selectPizzaData);

    const dispatch = useAppDispatch();

    const isSearch = useRef<boolean>(false);

    const renderedItems = pizzas
        .filter((obj: any) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
            return false;
        })
        .map((pizzaItem: any) => {
            return <PizzaBlock {...pizzaItem} key={pizzaItem.id} />;
        });
    const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);

    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const search = searchValue.length > 0 ? `&search=${searchValue}` : '';

    const categoryIdHandler = useCallback(
        (index: number) => {
            dispatch(setCategoryId(index));
        },
        [dispatch]
    );

    const sortByHandler = (sortProperty: string) => {
        dispatch(setsortBy(sortProperty));
    };

    const fetchPizzaHandler = useCallback(async () => {
        dispatch(
            fetchPizzas({ category, sortBy: sortBy, search, currentPage })
        );

        window.scrollTo(0, 0);
    }, [category, currentPage, dispatch, search, sortBy]);

    // if first render ->  check URL parameters and save them in Redux state
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            dispatch(
                setFilters({
                    ...params,
                    categoryId: 0,
                    sortBy: '',
                    currentPage: 0,
                    searchValue: '',
                })
            );

            isSearch.current = true;
        }
    }, [dispatch]);

    // if first render -> fetch pizzas
    useEffect(() => {
        if (!isSearch.current) {
            fetchPizzaHandler();
        }
        isSearch.current = false;
    }, [categoryId, sortBy, searchValue, currentPage, fetchPizzaHandler]);

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    categoryId={categoryId}
                    categoryIdHandler={categoryIdHandler}
                />

                <PizzaBuilder />

                <Sort sortBy={sortBy} />
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
