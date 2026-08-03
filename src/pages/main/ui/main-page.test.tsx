/* eslint-disable @typescript-eslint/unbound-method */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import { store } from '@/app/store';
import { MainPage } from './main-page';

describe('MainPage', () => {
  it('should render the header and empty state by default', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    expect(screen.getByText('Submission Archive')).toBeInTheDocument();
    expect(screen.getByText('No submissions yet. Create one!')).toBeInTheDocument();
  });

  it('should open uncontrolled form modal when clicking the button', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /open uncontrolled form/i });
    await user.click(button);

    await waitFor(() => {
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
  });

  it('should open controlled form modal when clicking the button', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /open react hook form/i });
    await user.click(button);

    await waitFor(() => {
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
  });
});
