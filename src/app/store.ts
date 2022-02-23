import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import changelogsReducer from '../features/changelogs/changelog.slice';
import filtersSlice from '../features/filters/filters.slice';

export function createStore(preloadedState) {
  return configureStore({
    reducer: { 
      changelog: changelogsReducer,
      filters: filtersSlice
    },
    preloadedState,
  })
}

let store;
export const initialiseStore = (preloadedState) => {
  let _store = store ?? createStore(preloadedState);

  if (preloadedState && store) {
   _store = createStore({ ...store.getState(), ...preloadedState });
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initialiseStore(initialState), [initialState]);
  return store;
}

//const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
