import {
  combineReducers,
  configureStore,
  createSlice,
  getDefaultMiddleware,
  PayloadAction,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {rootWatcher} from '../saga';

import {ICard, IComment, IColumn} from '../typescript/interfaces';

interface cardsInitial {
  cards: ICard[];
}

const initialStateCards: cardsInitial = {
  cards: [],
};

interface commentsInitial {
  comments: IComment[];
}

const initialStateComments: commentsInitial = {
  comments: [],
};

interface paramsInitial {
  token: string;
  onLogin: boolean;
  error: boolean;
}

const initialStateParams: paramsInitial = {
  token: '',
  onLogin: false,
  error: false,
};

interface loginPayload {
  token: string;
}

interface errorPayload {
  error: boolean;
}

interface columnsInitial {
  columns: IColumn[];
}

const initialStateColumns: columnsInitial = {
  columns: [],
};

const columnsSlice = createSlice({
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

const paramsSlice = createSlice({
  name: 'paramsSlice',
  initialState: initialStateParams,
  reducers: {
    setLogin: (state, action: PayloadAction<loginPayload>) => {
      return {
        ...state,
        token: action.payload.token,
        onLogin: true,
      };
    },
    setError: (state, action: PayloadAction<errorPayload>) => {
      return {
        ...state,
        error: true,
      };
    },
  },
});

const cardsSlice = createSlice({
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

const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState: initialStateComments,
  reducers: {
    getAllComments: (state, action: PayloadAction<IComment[]>) => {
      return {comments: action.payload};
    },
  },
});

export const {getAllCards} = cardsSlice.actions;
export const {getAllComments} = commentsSlice.actions;
export const {setLogin, setError} = paramsSlice.actions;
export const {getAllColumns} = columnsSlice.actions;

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

const rootReducer = combineReducers({
  cardsStore: cardsSlice.reducer,
  commentsStore: commentsSlice.reducer,
  paramsStore: paramsSlice.reducer,
  columnStore: columnsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
