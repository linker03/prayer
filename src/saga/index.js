import {all} from 'redux-saga/effects';
import cardWatcher from './cardsSaga';
import commentWatcher from './commentSaga';
import paramsWatcher from './paramsSaga';
import columnWatcher from './columnSaga';

export function* rootWatcher() {
  yield all([
    cardWatcher(),
    commentWatcher(),
    paramsWatcher(),
    columnWatcher(),
  ]);
}
