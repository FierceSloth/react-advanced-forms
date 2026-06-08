import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import { store } from '@/app/store';
import { ControlledForm } from './controlled-form';

describe('ControlledForm', () => {
  const renderForm = (): ReturnType<typeof render> => {
    return render(
      <Provider store={store}>
        <ControlledForm onSuccess={vi.fn()} />
      </Provider>
    );
  };

  it('should render all form fields', () => {
    renderForm();

    expect(screen.getByRole('textbox', { name: /full name/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /age/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /gender/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/profile picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /i agree to the terms and conditions/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit profile/i })).toBeInTheDocument();
  });

  it('should disable submit button when form is invalid', () => {
    renderForm();

    const submitButton = screen.getByRole('button', { name: /submit profile/i });
    expect(submitButton).toBeDisabled();
  });

  it('should show validation errors on invalid input', async () => {
    const user = userEvent.setup();
    renderForm();

    const nameInput = screen.getByRole('textbox', { name: /full name/i });
    await user.type(nameInput, 'john');
    await user.click(document.body);

    await waitFor(() => {
      expect(screen.getByText('The name must begin with a capital letter')).toBeInTheDocument();
    });
  });

  it('should enable submit button and call onSuccess when form is valid', async () => {
    const onSuccessMock = vi.fn();
    const user = userEvent.setup({ delay: null });

    render(
      <Provider store={store}>
        <ControlledForm onSuccess={onSuccessMock} />
      </Provider>
    );

    await user.type(screen.getByRole('textbox', { name: /full name/i }), 'John');
    await user.type(screen.getByRole('spinbutton', { name: /age/i }), '25');
    await user.type(screen.getByRole('textbox', { name: /email address/i }), 'john@example.com');
    await user.type(screen.getByRole('combobox', { name: /country/i }), 'USA');
    await user.selectOptions(screen.getByRole('combobox', { name: /gender/i }), 'male');

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/profile picture/i);
    await user.upload(fileInput, file);

    await user.type(screen.getByLabelText(/^password$/i), 'Password123!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123!');

    const termsCheckbox = screen.getByRole('checkbox', { name: /i agree to the terms and conditions/i });
    await user.click(termsCheckbox);

    const submitButton = screen.getByRole('button', { name: /submit profile/i });
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalledOnce();
    });
  }, 10_000);
});
