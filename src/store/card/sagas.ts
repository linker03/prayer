import {put, takeEvery, call, select} from 'redux-saga/effects';
import {getAllCards} from './reducer';
import {sagaCardActions} from './actions';
import {getToken} from './selectors';
import {callAPI} from '../../utils/callApi';

type cardDetails = {
  title: string;
  description: string;
  checked: boolean;
  column: number;
};

type createCardAction = {
  type: string;
  payload: cardDetails;
};

type editCardAction = {
  type: string;
  payload: {
    cardId: number;
    body: cardDetails;
  };
};

type deleteCardAction = {
  type: string;
  payload: {
    cardId: number;
  };
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

export function* createCardSaga(action: createCardAction) {
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

export function* editCardSaga(action: editCardAction) {
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

export function* deleteCardSaga(action: deleteCardAction) {
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
  yield takeEvery(sagaCardActions.GET_CARDS_SAGA, getAllCardsSaga);
  yield takeEvery(sagaCardActions.CREATE_CARDS_SAGA, createCardSaga);
  yield takeEvery(sagaCardActions.EDIT_CARD_SAGA, editCardSaga);
  yield takeEvery(sagaCardActions.DELETE_CARD_SAGA, deleteCardSaga);
}
