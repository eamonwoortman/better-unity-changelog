import { configureStore } from '@reduxjs/toolkit';
import changelogSlice from '../features/changelogs/changelog-slice';
import counterSlice from '../features/counter/counter-slice';
export const store = configureStore({
    reducer: { 
        counter: counterSlice,
        changelog: changelogSlice,
    },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
