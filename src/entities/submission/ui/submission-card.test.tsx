import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { store } from '@/app/store';
import { SubmissionCard } from './submission-card';
import type { ICardEntity } from '@/app/store/submission';

describe('SubmissionCard', () => {
  const mockEntity: ICardEntity = {
    id: 'test-id-1234567890',
    name: 'John Doe',
    age: 30,
    gender: 'male',
    email: 'john@example.com',
    country: 'USA',
    timestamp: 1_622_505_600_000,
    acceptTerms: true,
    image: '',
  };

  it('should render entity details', () => {
    render(
      <Provider store={store}>
        <SubmissionCard entity={mockEntity} />
      </Provider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('ID: test-id-12')).toBeInTheDocument();

    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('should render image if provided', () => {
    render(
      <Provider store={store}>
        <SubmissionCard entity={{ ...mockEntity, image: 'data:image/png;base64,test' }} />
      </Provider>
    );

    const image = screen.getByAltText('John Doe');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'data:image/png;base64,test');
  });

  it('should trigger delete on button click', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <SubmissionCard entity={mockEntity} />
      </Provider>
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);
  });
});
