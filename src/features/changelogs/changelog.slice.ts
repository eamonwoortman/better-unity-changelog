import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChangelogDataService from './changelog.service';
import { Catalog, ChangelogState } from './changelog.types';

async function getCatalog(): Promise<Catalog> {
  try {
    return await ChangelogDataService.getCatalog();
  } catch (error) {
    throw new Error(error);
  }
}

/* fetchCatalog */ 
export const fetchCatalog = createAsyncThunk<Catalog>('changelogs/fetchCatalog',
    async (_) => {
        try {
          return await getCatalog();
        } catch (error : any) {
            // just rethrow for now
            throw error;
        }
    }
)

const initialState: ChangelogState = {
  catalog: undefined,
  changelogs: [],
  status: 'idle',
  error: undefined
};

const changelogSlice = createSlice({
    name: 'changelog',
    initialState,
    reducers: {
        // fill in primary logic here
    },
    extraReducers: (builder) => {
      /* fetchCatalog */ 
      builder.addCase(fetchCatalog.pending, (state, action) => {
        state.status = 'loading'
      }),
      builder.addCase(fetchCatalog.fulfilled, (state, action) => {
        state.catalog = action.payload
        state.status = 'success'
      }),
      builder.addCase(fetchCatalog.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error
      })
    },
});

export const changelogSelector = state => state.changelog
export default changelogSlice.reducer;
