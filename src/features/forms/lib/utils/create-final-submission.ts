import type { Gender, ICardEntity } from '@/app/store/submission';
import type { FormSchemaType } from '@/shared/lib/validations/form-schema';

export const createFinalSubmission = (data: FormSchemaType, base64Image: string): ICardEntity => ({
  ...data,
  gender: data.gender as Gender,
  id: crypto.randomUUID(),
  image: base64Image,
  timestamp: Date.now(),
});
