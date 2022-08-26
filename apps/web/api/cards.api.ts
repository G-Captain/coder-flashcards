import { createApi } from '@reduxjs/toolkit/query/react';
import { CardDto } from '../types/Card.dto';
import { CreateCardInput } from '../types/CreateCard.input';
import { baseQuery } from './baseQuery';
import { HYDRATE } from 'next-redux-wrapper';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery,
  tagTypes: ['Cards'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCards: builder.query<CardDto[], void>({
      query: () => '/cards',
      providesTags: ['Cards'],
      //   transformResponse: (cardsArr: CardDto[]) =>
      //     cardsArr?.sort((a, b) => b.id - a.id),
    }),

    addCard: builder.mutation<CardDto, CreateCardInput>({
      query: (body) => ({ url: '/cards/dupa', method: 'POST', body }),
      invalidatesTags: ['Cards'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCardsQuery,
  useAddCardMutation,
  util: { getRunningOperationPromises },
} = cardsApi;

// export endpoints for use in SSR
export const { getCards, addCard } = cardsApi.endpoints;
