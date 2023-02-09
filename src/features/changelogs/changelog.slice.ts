import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Catalog, ChangelogState } from '../../components/changelog/changelog.types'
import ChangelogDataService from './changelog.service'

async function getCatalog(): Promise<Catalog> {
  try {
    return await ChangelogDataService.getCatalog()
  } catch (error) {
    throw new Error(error)
  }
}

/* FetchCatalog */
export const fetchCatalog = createAsyncThunk<Catalog>(
  'changelogs/fetchCatalog',
  async (_) => {
    try {
      return await getCatalog()
    } catch (error : any) {
      // Just rethrow for now
      throw error
    }
  }
)

const initialState: ChangelogState = {
  catalog: undefined,
  changelogs: [],
  status: 'idle',
  error: undefined
}

const changelogSlice = createSlice({
  name: 'changelog',
  initialState,
  reducers: {
    // Fill in primary logic here
  },
  extraReducers: (builder) => {

    /* FetchCatalog */
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
  }
})

export const changelogSelector = (state) => state.changelog
export default changelogSlice.reducer
