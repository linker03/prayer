import {put, takeEvery, call, select} from 'redux-saga/effects';
import {getAllColumns} from './reducer';
import {sagaColumnActions} from './actions';
import {getToken} from './selectors';
import {callAPI} from '../../utils/callApi';
import {refresh} from '../../utils/refresh';

type createColumnAction = {
  type: string;
  payload: {title: string};
};

type editColumnAction = {
  type: string;
  payload: {columnId: number; title: string};
};

type deleteColumnAction = {
  type: string;
  payload: {columnId: number};
};

export function* getAllColumnsSaga() {
  const token = yield select(getToken);
  try {
    const result = yield call(() =>
      callAPI({
        url: 'http://trello-purrweb.herokuapp.com/columns',
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    yield put(getAllColumns(result.data));
  } catch (error) {
    console.log(error);
  }
}

export function* createColumnSaga(action: createColumnAction) {
  console.log('ACTION', action);
  const token = yield select(getToken);
  try {
    const response = yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/columns`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          title: action.payload.title,
          description: 'some description',
        },
      }),
    );
    const result = yield call(() => refresh('columns', token));
    yield put(getAllColumns(result.data));
    console.log('CREATE RESPONSE', JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
}

export function* editColumnSaga(action: editColumnAction) {
  console.log('ACTION', action);
  const token = yield select(getToken);
  try {
    const response = yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/columns/${action.payload.columnId}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          title: action.payload.title,
          description: 'some description',
        },
      }),
    );
    const result = yield call(() => refresh('columns', token));
    yield put(getAllColumns(result.data));
  } catch (error) {
    console.log(error);
  }
}

export function* deleteColumnSaga(action: deleteColumnAction) {
  const token = yield select(getToken);
  try {
    const response = yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/columns/${action.payload.columnId}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    const result = yield call(() => refresh('columns', token));
    yield put(getAllColumns(result.data));
  } catch (error) {
    console.log(error);
  }
}

export default function* columnWatcher() {
  yield takeEvery(sagaColumnActions.GET_COLUMNS_SAGA, getAllColumnsSaga);
  yield takeEvery(sagaColumnActions.CREATE_COLUMN_SAGA, createColumnSaga);
  yield takeEvery(sagaColumnActions.EDIT_COLUMN_SAGA, editColumnSaga);
  yield takeEvery(sagaColumnActions.DELETE_COLUMN_SAGA, deleteColumnSaga);
}
