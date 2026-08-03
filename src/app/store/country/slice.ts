import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    'Kazakhstan',
    'USA',
    'Germany',
    'France',
    'Japan',
    'Italy',
    'Russia',
    'Belarus',
    'Spain',
    'Canada',
    'Australia',
    'Brazil',
    'China',
    'India',
    'South Korea',
    'United Kingdom',
    'Mexico',
    'Argentina',
    'Netherlands',
    'Switzerland',
    'Sweden',
    'Norway',
  ],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

export const countryReducer = countrySlice.reducer;
