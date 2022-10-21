import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterSliceState {
    categoryId: number;
    sortBy: string;
    currentPage: number;
    searchValue: string;
}

const initialState: FilterSliceState = {
    categoryId: 0,
    sortBy: 'title',
    currentPage: 1,
    searchValue: '',
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        setsortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.categoryId = Number(action.payload.categoryId);
            state.sortBy = action.payload.sortBy;
            state.currentPage = Number(action.payload.currentPage);
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sortBy;

export const {
    setCategoryId,
    setsortBy,
    setCurrentPage,
    setSearchValue,
    setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
