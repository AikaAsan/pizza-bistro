import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    sortOption: 'title',
    currentPage: 1,
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
        setFilters: (state, action) => {
            state.categoryId = Number(action.payload.categoryId);
            state.sortOption = action.payload.sortOption;
            state.currentPage = Number(action.payload.currentPage);
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortOption, setCurrentPage, setFilters } =
    filterSlice.actions;

export default filterSlice.reducer;
