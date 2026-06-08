import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './checkbox';

describe('Checkbox Component', () => {
  it('should render label correctly', () => {
    render(<Checkbox label="Accept Terms" />);
    const checkboxElement = screen.getByRole('checkbox', { name: /accept terms/i });

    expect(checkboxElement).toBeInTheDocument();
  });

  it('should toggle checked state on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept Terms" />);

    const checkboxElement = screen.getByRole('checkbox', { name: /accept terms/i });
    expect(checkboxElement).not.toBeChecked();

    await user.click(checkboxElement);
    expect(checkboxElement).toBeChecked();

    await user.click(checkboxElement);
    expect(checkboxElement).not.toBeChecked();
  });

  it('should render error message when provided', () => {
    const errorMessage = 'You must accept the terms';
    render(<Checkbox label="Accept Terms" error={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it('should pass native html attributes like disabled', () => {
    render(<Checkbox label="Disabled Checkbox" disabled />);
    const checkboxElement = screen.getByRole('checkbox', { name: /disabled checkbox/i });

    expect(checkboxElement).toBeDisabled();
  });

  it('should call onChange handler when clicked', async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox label="Test Checkbox" onChange={onChangeMock} />);
    const checkboxElement = screen.getByRole('checkbox', { name: /test checkbox/i });

    await user.click(checkboxElement);
    expect(onChangeMock).toHaveBeenCalledOnce();
  });
});
