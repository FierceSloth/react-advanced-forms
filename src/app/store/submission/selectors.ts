import type { RootState } from '@/app/store/store';
import type { ICardEntity } from '@/app/store/submission/types';

export const selectSubmissions = (state: RootState): ICardEntity[] => state.submission.items;
