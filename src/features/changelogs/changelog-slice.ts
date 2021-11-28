import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChangelogDataService from '../../services/changelog.service';

interface Catalog {
    date_modified: string,
    changelogs: string[]
}

interface ChangelogState {
  changelogs:any[],
  status:string,
  error:any
}

const initialState: ChangelogState = {
  changelogs: [],
  status: 'idle',
  error: null
};


const changelogsTransformation = async (catalog: Catalog) => {
  let url = '/'
  const genreRequestArray:any[] = []
  catalog.changelogs.forEach(changelog_url => {
      let newUrlParser = url += changelog_url;
      genreRequestArray.push(ChangelogDataService.get(changelog_url).then(response => (response.data)))
      /*newUrlParser += genre.id.toString()
      genreRequestArray.push(axios.get(newUrlParser).then(response =>
          ({ title: genre.name, videos: response.data.results })))*/
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

export const fetchChangelogs = createAsyncThunk('changelogs/fetchChangelogs',
    async (_, { rejectWithValue }) => {
        try {
            const catalog = await getCatalog();
            return await changelogsTransformation(catalog)
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
export const selectTvByGenre = state => state.changelog
export default changelogSlice.reducer;
