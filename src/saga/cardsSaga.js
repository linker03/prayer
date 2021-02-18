import {put, takeEvery, call, select} from 'redux-saga/effects';
import Axios from 'axios';
import {getAllCards} from '../redux/store';
import {sagaActions} from './sagaActions';
import {getToken} from './selectors';

let callAPI = async ({url, method, data, headers}) => {
  return await Axios({
    url,
    method,
    data,
    headers,
  });
};

export function* getAllCardsSaga() {
  const token = yield select(getToken);
  try {
    const result = yield call(() =>
      callAPI({
        url: 'http://trello-purrweb.herokuapp.com/cards',
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    yield put(getAllCards(result.data));
  } catch (error) {
    console.log(error);
  }
}

export function* createCardSaga(action) {
  const token = yield select(getToken);
  console.log('ACTION', action);
  try {
    const response = yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/cards`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: action.payload,
      }),
    );
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
}

export function* editCardSaga(action) {
  const token = yield select(getToken);
  console.log('ACTION', action);
  try {
    yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/cards/${action.payload.cardId}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: action.payload.body,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export function* deleteCardSaga(action) {
  const token = yield select(getToken);
  try {
    yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/cards/${action.payload.cardId}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* cardWatcher() {
  yield takeEvery(sagaActions.GET_CARDS_SAGA, getAllCardsSaga);
  yield takeEvery(sagaActions.CREATE_CARDS_SAGA, createCardSaga);
  yield takeEvery(sagaActions.EDIT_CARD_SAGA, editCardSaga);
  yield takeEvery(sagaActions.DELETE_CARD_SAGA, deleteCardSaga);
}
