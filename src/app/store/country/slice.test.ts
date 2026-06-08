import { describe, expect, it } from 'vitest';
import { countryReducer } from './slice';

describe('Country Slice', () => {
  it('should return initial state with default countries', () => {
    const state = countryReducer(undefined, { type: 'unknown' });

    expect(state.list.length).toBeGreaterThan(0);
    expect(state.list).toContain('USA');
  });
});
