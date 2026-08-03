import type { RootState } from '@/app/store/store';

export const selectCountries = (state: RootState): string[] => state.country.list;
