import { configureStore } from '@reduxjs/toolkit';
import { submissionReducer } from './submission';

export const store = configureStore({
  reducer: {
    submission: submissionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
