import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICard} from '../../utils/interfaces';

interface cardsInitial {
  cards: ICard[];
}

const initialStateCards: cardsInitial = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState: initialStateCards,
  reducers: {
    getAllCards: (state, action: PayloadAction<ICard[]>) => {
      return {
        cards: action.payload,
      };
    },
  },
});

export const {getAllCards} = cardsSlice.actions;
