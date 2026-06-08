import { describe, expect, it } from 'vitest';
import { addSubmission, clearAllSubmission, deleteSubmission, submissionReducer } from './slice';
import type { ICardEntity } from './types';

describe('Submission Slice', () => {
  const initialState = { items: [] };

  const mockSubmission: ICardEntity = {
    id: '123',
    name: 'John',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    country: 'USA',
    timestamp: 1_000_000,
    acceptTerms: true,
    image: '',
  };

  it('should return initial state by default', () => {
    const state = submissionReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should handle addSubmission', () => {
    const state = submissionReducer(initialState, addSubmission(mockSubmission));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockSubmission);
  });

  it('should handle deleteSubmission', () => {
    const startState = { items: [mockSubmission] };
    const state = submissionReducer(startState, deleteSubmission('123'));

    expect(state.items).toHaveLength(0);
  });

  it('should handle clearAllSubmission', () => {
    const startState = { items: [mockSubmission] };
    const state = submissionReducer(startState, clearAllSubmission());

    expect(state.items).toHaveLength(0);
  });
});
