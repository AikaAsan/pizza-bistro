import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { selectFilter, setCurrentPage } from '../../redux/slices/filterSlice';
import { selectPizzaData } from '../../redux/slices/pizzaSlice';
import classes from './Pagination.module.scss';

export const Pagination: React.FC = () => {
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();
    const { currentPage } = useSelector(selectFilter);
    const { totalItems } = useSelector(selectPizzaData);


    useEffect(() => {
        setTotalPages(Math.ceil(totalItems / 4));
    }, [totalPages, totalItems]);

    return (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={4}
            onPageChange={(event) =>
                dispatch(setCurrentPage(event.selected + 1))
            }
            forcePage={currentPage - 1}
            className={classes.root}
        />
    );
};
