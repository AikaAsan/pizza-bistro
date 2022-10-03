import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    sortOption: 'title',
    currentPage: 1,
    searchValue: '',
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setSortOption: (state, action) => {
            state.sortOption = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setFilters: (state, action) => {
            state.categoryId = Number(action.payload.categoryId);
            state.sortOption = action.payload.sortOption;
            state.currentPage = Number(action.payload.currentPage);
        },
    },
});

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;

export const {
    setCategoryId,
    setSortOption,
    setCurrentPage,
    searchValue,
    setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
