import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IComment} from '../../utils/interfaces';

interface commentsInitial {
  comments: IComment[];
}

const initialStateComments: commentsInitial = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState: initialStateComments,
  reducers: {
    getAllComments: (state, action: PayloadAction<IComment[]>) => {
      return {comments: action.payload};
    },
  },
});

export const {getAllComments} = commentsSlice.actions;
