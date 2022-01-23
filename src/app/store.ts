import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import changelogsReducer from '../features/changelogs/changelog.slice'
import filtersSlice from '../features/filters/filters.slice'

export function makeStore() {
  return configureStore({
    reducer: { 
      changelog: changelogsReducer,
      filters: filtersSlice
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
