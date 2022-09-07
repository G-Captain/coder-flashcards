import { Category } from './Category';

export interface CreateCardInput {
  question: string;
  problem?: string;
  answer: string;
  category: Category;
}
