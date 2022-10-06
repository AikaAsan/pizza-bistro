import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterSliceState {
    categoryId: number;
    sortOption: string;
    currentPage: number;
    searchValue: string;
}

const initialState: FilterSliceState = {
    categoryId: 0,
    sortOption: 'title',
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
        setSortOption: (state, action: PayloadAction<string>) => {
            state.sortOption = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.categoryId = Number(action.payload.categoryId);
            state.sortOption = action.payload.sortOption;
            state.currentPage = Number(action.payload.currentPage);
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sortOption;

export const {
    setCategoryId,
    setSortOption,
    setCurrentPage,
    setSearchValue,
    setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
