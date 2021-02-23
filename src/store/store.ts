import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {authSlice} from './auth/reducer';
import {cardsSlice} from './card/reducer';
import {commentsSlice} from './comment/reducer';
import {columnsSlice} from './column/reducer';
import cardWatcher from './card/sagas';
import commentWatcher from './comment/sagas';
import authWatcher from './auth/sagas';
import columnWatcher from './column/sagas';

const rootReducer = combineReducers({
  cardsStore: cardsSlice.reducer,
  commentsStore: commentsSlice.reducer,
  authStore: authSlice.reducer,
  columnStore: columnsSlice.reducer,
});

function* rootWatcher() {
  yield all([cardWatcher(), commentWatcher(), authWatcher(), columnWatcher()]);
}

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
