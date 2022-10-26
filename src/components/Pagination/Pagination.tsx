import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { selectFilter, setCurrentPage } from '../../redux/slices/filterSlice';
import classes from './Pagination.module.scss';

export const Pagination: React.FC = () => {
    const dispatch = useDispatch();
    const { currentPage } = useSelector(selectFilter);
    return (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={4}
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
