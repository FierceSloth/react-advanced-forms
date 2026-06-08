import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';

import { store } from '@/app/store';
import { App } from './app';

describe('App', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
