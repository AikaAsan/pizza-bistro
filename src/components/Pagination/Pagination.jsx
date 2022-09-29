import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.module.scss';
const Pagination = () => {
    const { currentPage } = useSelector((state) => state.filter.currentPage);
    const dispatch = useDispatch();
    return (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={3}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={(event) =>
                dispatch(setCurrentPage(event.selected + 1))
            }
            containerClassName={classes.container}
            pageClassName={classes.page}
            activeLinkClassName={classes.activeLink}
            nextClassName={classes.navigation}
            previousClassName={classes.navigation}
        />
    );
};

export default Pagination;
