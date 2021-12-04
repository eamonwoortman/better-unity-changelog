import { configureStore } from '@reduxjs/toolkit';
import changelogSlice from '../features/changelogs/changelog-slice';

export const store = configureStore({
    reducer: { 
        changelog: changelogSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
