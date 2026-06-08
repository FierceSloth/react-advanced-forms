import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FileInput } from './file-input';

describe('FileInput Component', () => {
  it('should render label correctly', () => {
    render(<FileInput label="Upload Avatar" />);
    const inputElement = screen.getByLabelText(/upload avatar/i);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'file');
  });

  it('should render error message when provided', () => {
    const errorMessage = 'File size is too large';
    render(<FileInput label="Upload Avatar" error={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it('should allow user to upload a file', async () => {
    const user = userEvent.setup();
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    render(<FileInput label="Upload Avatar" />);
    const inputElement = screen.getByLabelText(/upload avatar/i);

    await user.upload(inputElement, file);

    expect(inputElement.files).toHaveLength(1);
    expect(inputElement.files?.[0]).toBe(file);
    expect(inputElement.files?.[0].name).toBe('hello.png');
  });

  it('should call onChange handler when file is uploaded', async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    render(<FileInput label="Upload Avatar" onChange={onChangeMock} />);
    const inputElement = screen.getByLabelText(/upload avatar/i);

    await user.upload(inputElement, file);
    expect(onChangeMock).toHaveBeenCalledOnce();
  });
});
