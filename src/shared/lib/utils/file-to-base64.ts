export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.addEventListener('error', () => {
      reject(reader.error || new Error('Failed to convert file to Base64'));
    });
  });
};
