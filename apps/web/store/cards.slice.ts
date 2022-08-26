import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardDto } from '../types/Card.dto';

export interface CardsSlice {
  Cards: CardDto[];
  isError: boolean;
}

const initialCardsState: CardsSlice = { Cards: [], isError: false };

const CardsSlice = createSlice({
  name: 'Cards',
  initialState: initialCardsState,
  reducers: {
    update(state, action: PayloadAction<CardDto[]>) {
      state.Cards = action.payload;
    },
    fetchError(state) {
      state.isError = true;
    },
  },
});

export const CardsActions = CardsSlice.actions;

export default CardsSlice.reducer;
