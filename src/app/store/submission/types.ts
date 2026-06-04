export type Gender = 'male' | 'female' | '';

export interface ICardEntity {
  id: string;
  timestamp: number;

  name: string;
  age: number;
  email: string;
  gender: Gender;
  acceptTerms: boolean;

  country: string;
  image: string;
}
