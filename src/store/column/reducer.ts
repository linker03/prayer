import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IColumn} from '../../utils/interfaces';

interface columnsInitial {
  columns: IColumn[];
}

const initialStateColumns: columnsInitial = {
  columns: [],
};

export const columnsSlice = createSlice({
  name: 'columnsSlice',
  initialState: initialStateColumns,
  reducers: {
    getAllColumns: (state, action: PayloadAction<IColumn[]>) => {
      return {
        columns: action.payload,
      };
    },
  },
});

export const {getAllColumns} = columnsSlice.actions;
