import { describe, expect, it, vi } from 'vitest';
import { fileToBase64 } from './file-to-base64';

describe('fileToBase64 Utility', () => {
  it('should convert a file to a base64 string', async () => {
    const mockFile = new File(['test content'], 'test.png', { type: 'image/png' });

    class MockFileReader {
      public result: string | null = null;
      public error: Error | null = null;
      public listeners: Record<string, () => void> = {};

      public readAsDataURL(): void {
        this.result = 'data:image/png;base64,dGVzdCBjb250ZW50';
        setTimeout(() => {
          if (this.listeners['load']) this.listeners['load']();
        }, 0);
      }

      public addEventListener(eventName: string, callback: () => void): void {
        this.listeners[eventName] = callback;
      }
    }

    vi.stubGlobal('FileReader', MockFileReader);

    const result = await fileToBase64(mockFile);

    expect(result).toBe('data:image/png;base64,dGVzdCBjb250ZW50');

    vi.unstubAllGlobals();
  });

  it('should reject when file reading fails', async () => {
    const mockFile = new File([''], 'error.png', { type: 'image/png' });

    class MockFileReader {
      public result: string | null = null;
      public error: Error | null = null;
      public listeners: Record<string, () => void> = {};

      public readAsDataURL(): void {
        this.error = new Error('File read error');
        setTimeout(() => {
          if (this.listeners['error']) this.listeners['error']();
        }, 0);
      }

      public addEventListener(eventName: string, callback: () => void): void {
        this.listeners[eventName] = callback;
      }
    }

    vi.stubGlobal('FileReader', MockFileReader);

    await expect(fileToBase64(mockFile)).rejects.toThrow('File read error');

    vi.unstubAllGlobals();
  });
});
