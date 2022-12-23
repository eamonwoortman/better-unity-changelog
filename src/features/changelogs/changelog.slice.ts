import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChangelogDataService from './changelog.service';
import { Catalog, ChangelogRoot, ChangelogState } from './changelog.types';

const changelogsTransformation = async (catalog: Catalog) => {
  const changelogRequestArray:any[] = []
  catalog.changelogs.forEach(changelog_entry => {
      const changelogFile = changelog_entry.file_name;
      var result = ChangelogDataService.get(changelogFile) as Promise<ChangelogRoot>;
      changelogRequestArray.push(result)
  })

  try {
      return await Promise.all(changelogRequestArray)
  } catch (error) {
      throw new Error(error)
  }
}

async function getCatalog(): Promise<Catalog> {
  try {
    return await ChangelogDataService.getCatalog();
  } catch (error) {
    throw new Error(error);
  }
}

/* fetchChangelogs */ 
export const fetchChangelogs = createAsyncThunk('changelogs/fetchChangelogs',
    async (catalog:Catalog) => {
        try {
            return await changelogsTransformation(catalog)
          } catch (error : any) {
            // just rethrow for now
            throw error;
        }
    }
)

/* transforms catalog, adds slugs to each entry  */ 
const catalogTransformation = (catalog: Catalog) => {
  catalog.changelogs.forEach(changelog_entry => {
    const slug = changelog_entry.file_name.replace('.json', '');
    changelog_entry.slug = slug;
  });
  return catalog;
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
          state.error = action.error
        })
    },
});

export const changelogSelector = state => state.changelog
export default changelogSlice.reducer;
