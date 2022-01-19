import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '../../app/store';

export interface CategoryFilterOption {
    id: string;
    name: string;
}

export interface FilterState {
    use_simple_view: boolean;
    category_filters: CategoryFilterOption[];
    initial_categories: string[];
    search_text: string;
}

const initialState: FilterState = {
    use_simple_view: false,
    category_filters:  [],
    initial_categories: [], 
    search_text: ""
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,

  reducers: {
    add_category_filter : (state, action: PayloadAction<CategoryFilterOption>) => {
        if (!action.payload || state.category_filters.includes(action.payload)) {
            return;
        }
        state.category_filters.push(action.payload);
    },
    remove_category_filter : (state, action: PayloadAction<CategoryFilterOption>) => {
        if (!action.payload || state.category_filters.includes(action.payload)) {
            return;
        }
        state.category_filters = state.category_filters.filter(obj => obj.id !== action.payload.id);
    },

    set_simple_view : (state, action: PayloadAction<boolean>) => {
        state.use_simple_view = action.payload;
    }, 

    set_search_text : (state, action: PayloadAction<string>) => {
        state.search_text = action.payload;
    },

    clear_search_text: (state) => {
      state.search_text = "";
    },

    set_initial_categories: (state, action: PayloadAction<string[]>) => {
        state.initial_categories = action.payload;
    }
  },

})

export const { add_category_filter, remove_category_filter, set_search_text, clear_search_text, set_simple_view, set_initial_categories } = filtersSlice.actions

export const selectSearchText = (state: AppState) => state.filters.search_text;
export const selectCategoryFilters = (state: AppState) => state.filters.category_filters;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer