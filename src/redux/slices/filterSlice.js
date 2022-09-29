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
    },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortOption, setCurrentPage } =
    filterSlice.actions;

export default filterSlice.reducer;
