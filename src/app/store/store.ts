import { configureStore } from '@reduxjs/toolkit';
import { countryReducer } from './country';
import { submissionReducer } from './submission';

export const store = configureStore({
  reducer: {
    submission: submissionReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
