import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChangelogDataService from '../../services/changelog.service';

export interface CatalogEntry {
  version: string,
  file_name: string
}

export interface Catalog {
    date_modified: string,
    changelogs: CatalogEntry[]
}

interface ChangelogNode {
  name: string,
  children?: ChangelogNode[],
  entries?: string[]
}

interface ChangelogRoot {
  version: string,
  url: string,
  categories: ChangelogNode[]
}

interface ChangelogState {
  catalog?: Catalog,
  changelogs:any[],
  status:string,
  error:any
}

const initialState: ChangelogState = {
  catalog: undefined,
  changelogs: [],
  status: 'idle',
  error: null
};

const changelogsTransformation = async (catalog: Catalog) => {
  let url = '/'
  const genreRequestArray:any[] = []
  catalog.changelogs.forEach(changelog_entry => {
      const changelogId = changelog_entry.file_name;
      genreRequestArray.push(ChangelogDataService.get(changelogId).then(response => (response.data as ChangelogRoot)))
  })

  try {
      return await Promise.all(genreRequestArray)
  } catch (error) {
      throw new Error(error)
  }
}

async function getCatalog(): Promise<Catalog> {
  try {
    const res = await ChangelogDataService.getCatalog();
    return res.data as Catalog;
  } catch (error) {
    throw new Error(error);
  }
}

/* fetchChangelogs */ 
export const fetchChangelogs = createAsyncThunk('changelogs/fetchChangelogs',
    async (catalog:Catalog, { rejectWithValue }) => {
        try {
            return await changelogsTransformation(catalog)
        } catch (error) {
            if (!error.response) {
                throw error
            }

            return rejectWithValue(error.response.data)
        }
    }
)

/* fetchCatalog */ 
export const fetchCatalog = createAsyncThunk<Catalog>('changelogs/fetchCatalog',
    async (_, { rejectWithValue }) => {
        try {
            return await getCatalog();
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

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
        if (action.payload) {
            state.error = action.payload.status_message
        } else {
            state.error = action.error
        }
      }),

      /* fetchChangelogs */ 
      builder.addCase(fetchChangelogs.pending, (state, action) => {
          state.status = 'loading'
        }),
        builder.addCase(fetchChangelogs.fulfilled, (state, action) => {
          action.payload.forEach(changelog => {
            state.changelogs.push({ ...changelog })
          })
          state.status = 'success'
        }),
        builder.addCase(fetchChangelogs.rejected, (state, action) => {
          state.status = 'error'
          if (action.payload) {
              state.error = action.payload.status_message
          } else {
              state.error = action.error
          }
        })
    },
});


/*
const { reducer } = changelogSlice;
export default reducer;
*/
//export const { getCatalog } = changelogSlice.caseReducers;
export const changelogSelector = state => state.changelog
export default changelogSlice.reducer;
