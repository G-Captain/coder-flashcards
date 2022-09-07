import { createSlice } from '@reduxjs/toolkit';
import { CreateCardInput } from '../types/CreateCard.input';

export interface CardFormSlice extends CreateCardInput {
  step?: number;
}
const initialCardFormSlice: CardFormSlice = {
  step: 0,
  question: '',
  problem: '',
  answer: '',
  category: 'javascript',
};

const cardFormSlice = createSlice({
  name: 'cardForm',
  initialState: initialCardFormSlice,
  reducers: {
    resetFormData(state) {
      state.step = initialCardFormSlice.step;
      state.question = initialCardFormSlice.question;
      state.problem = initialCardFormSlice.problem;
      state.answer = initialCardFormSlice.answer;
      state.category = initialCardFormSlice.category;
    },
    updateStep(state, action) {
      state.step = action.payload?.step;
    },
    updateGeneralData(state, action) {
      state.question = action.payload?.question;
      state.problem = action.payload?.problem;
      state.answer = action.payload?.answer;
      state.category = action.payload?.category;
      state.step = 1;
    },
    createSuccess(state) {
      state.step = 2;
      state.question = initialCardFormSlice.question;
      state.problem = initialCardFormSlice.problem;
      state.answer = initialCardFormSlice.answer;
      state.category = initialCardFormSlice.category;
    },
  },
});

export default cardFormSlice.reducer;

export const cardFormActions = cardFormSlice.actions;
