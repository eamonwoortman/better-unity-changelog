import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'


export interface CategoryFilterOption {
    id:string;
    label:string;
}

export interface FilterState {
    category_filters: CategoryFilterOption[];
    search_text: string;
}

const initialState: FilterState = {
    category_filters:  [],
    search_text: ""
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,

  reducers: {
    add_category_filter : (state, action: PayloadAction<CategoryFilterOption>) => {
        if (state.category_filters.includes(action.payload)) {
            return;
        }
        state.category_filters.push(action.payload);
    },
    remove_category_filter : (state, action: PayloadAction<CategoryFilterOption>) => {
        if (state.category_filters.includes(action.payload)) {
            return;
        }
        state.category_filters.push(action.payload);
    },

    set_search_text : (state, action: PayloadAction<string>) => {
        state.search_text = action.payload;
    },

    clear_search_text: (state) => {
      state.search_text = "";
    },
  },

})

export const { add_category_filter, remove_category_filter, set_search_text, clear_search_text } = filtersSlice.actions

export const selectSearchText = (state: AppState) => state.filters.search_text;
export const selectCategoryFilters = (state: AppState) => state.filters.category_filters;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer