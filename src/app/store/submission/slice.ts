import type { ICardEntity } from '@/app/store/submission/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ISubmissionStore {
  items: ICardEntity[];
}

const initialState: ISubmissionStore = {
  items: [],
};

const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<ICardEntity>): void => {
      state.items.push(action.payload);
    },

    deleteSubmission: (state, action: PayloadAction<string>): void => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearAllSubmission: (state): void => {
      state.items = [];
    },
  },
});

export const { addSubmission, deleteSubmission, clearAllSubmission } = submissionSlice.actions;
export const submissionReducer = submissionSlice.reducer;
