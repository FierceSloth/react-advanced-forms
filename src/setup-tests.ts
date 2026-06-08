import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

if (globalThis.URL.createObjectURL === undefined) {
  Object.defineProperty(globalThis.URL, 'createObjectURL', { value: vi.fn() });
}
