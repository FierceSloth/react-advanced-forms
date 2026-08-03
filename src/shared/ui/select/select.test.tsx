import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './select';

describe('Select Component', () => {
  it('should render label correctly', () => {
    render(
      <Select label="Country">
        <option value="US">USA</option>
      </Select>
    );
    const selectElement = screen.getByRole('combobox', { name: /country/i });

    expect(selectElement).toBeInTheDocument();
  });

  it('should allow user to select an option', async () => {
    const user = userEvent.setup();
    render(
      <Select label="Country">
        <option value="US">USA</option>
        <option value="UK">United Kingdom</option>
      </Select>
    );

    const selectElement = screen.getByRole('combobox', { name: /country/i });
    await user.selectOptions(selectElement, 'UK');

    expect(selectElement).toHaveValue('UK');
  });

  it('should render error message when provided', () => {
    const errorMessage = 'Country is required';
    render(
      <Select label="Country" error={errorMessage}>
        <option value="US">USA</option>
      </Select>
    );

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it('should pass native html attributes like disabled', () => {
    render(
      <Select label="Country" disabled>
        <option value="US">USA</option>
      </Select>
    );

    const selectElement = screen.getByRole('combobox', { name: /country/i });
    expect(selectElement).toBeDisabled();
  });

  it('should call onChange handler when selection changes', async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();

    render(
      <Select label="Country" onChange={onChangeMock}>
        <option value="US">USA</option>
        <option value="UK">United Kingdom</option>
      </Select>
    );
    const selectElement = screen.getByRole('combobox', { name: /country/i });

    await user.selectOptions(selectElement, 'UK');
    expect(onChangeMock).toHaveBeenCalledOnce();
  });
});
