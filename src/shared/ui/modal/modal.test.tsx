import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from './modal';

describe('Modal Component', () => {
  it('should not show modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        Modal Content
      </Modal>
    );

    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).not.toHaveAttribute('open');
  });

  it('should render children when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Modal Content
      </Modal>
    );

    const contentElement = screen.getByText('Modal Content');
    expect(contentElement).toBeInTheDocument();
  });

  it('should call onClose when clicking on backdrop', async () => {
    const onCloseMock = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Modal Content
      </Modal>
    );

    const dialogElement = screen.getByRole('dialog', { hidden: true });

    await user.click(dialogElement);

    expect(onCloseMock).toHaveBeenCalledOnce();
  });

  it('should not call onClose when clicking on modal content', async () => {
    const onCloseMock = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );

    const contentElement = screen.getByText('Modal Content');
    await user.click(contentElement);

    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
