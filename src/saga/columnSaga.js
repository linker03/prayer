import {put, takeEvery, call, select} from 'redux-saga/effects';
import Axios from 'axios';
import {getAllColumns} from '../redux/store';
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

export function* createColumnSaga(action) {
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
    console.log('CREATE RESPONSE', JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
}

export function* editColumnSaga(action) {
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
    console.log('EDIT RESPONSE', JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
}

export function* deleteColumnSaga(action) {
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
    console.log('EDIT RESPONSE', JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
}

export default function* columnWatcher() {
  yield takeEvery(sagaActions.GET_COLUMNS_SAGA, getAllColumnsSaga);
  yield takeEvery(sagaActions.CREATE_COLUMN_SAGA, createColumnSaga);
  yield takeEvery(sagaActions.EDIT_COLUMN_SAGA, editColumnSaga);
  yield takeEvery(sagaActions.DELETE_COLUMN_SAGA, deleteColumnSaga);
}
