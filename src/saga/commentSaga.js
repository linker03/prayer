import {put, takeEvery, call, select} from 'redux-saga/effects';
import Axios from 'axios';
import {getAllComments} from '../redux/store';
import {sagaActions} from './sagaActions';
import {getToken} from './selectors';

const getCurrentDate = () => {
  const date = new Date();
  const month = (date.getMonth() + 1).toString();
  const day =
    date.getDate().toString().length == 1
      ? '0' + date.getDate().toString()
      : date.getDate();
  const hour =
    date.getUTCHours().toString().length == 1
      ? '0' + date.getUTCHours().toString()
      : date.getUTCHours();
  const minute =
    date.getUTCMinutes().toString().length == 1
      ? '0' + date.getUTCMinutes().toString()
      : date.getUTCMinutes();
  const seconds =
    date.getUTCSeconds().toString().length == 1
      ? '0' + date.getUTCSeconds().toString()
      : date.getUTCSeconds();
  const jsDate = `${date.getFullYear()}-${
    month.length == 1 ? '0' + month : month
  }-${day}T${hour}:${minute}:${seconds}.448+06:00`;

  return jsDate;
};

let callAPI = async ({url, method, data, headers}) => {
  return await Axios({
    url,
    method,
    data,
    headers,
  });
};

export function* getAllCommentsSaga() {
  const token = yield select(getToken);
  try {
    const result = yield call(() =>
      callAPI({
        url: 'http://trello-purrweb.herokuapp.com/comments',
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    yield put(getAllComments(result.data));
  } catch (error) {
    console.log(error);
  }
}

export function* createCommentSaga(action) {
  console.log('ACTION', action);
  const token = yield select(getToken);
  try {
    yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/cards/${action.payload.cardId}/comments`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          body: action.payload.body,
          created: getCurrentDate(),
        },
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export function* editCommentSaga(action) {
  console.log('ACTION', action);
  const token = yield select(getToken);
  try {
    yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/comments/${action.payload.commentId}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          body: action.payload.body,
          created: getCurrentDate(),
        },
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export function* deleteCommentSaga(action) {
  const token = yield select(getToken);
  try {
    yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/comments/${action.payload.commentId}`,
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

export default function* commentWatcher() {
  yield takeEvery(sagaActions.GET_COMMENTS_SAGA, getAllCommentsSaga);
  yield takeEvery(sagaActions.CREATE_COMMENT_SAGA, createCommentSaga);
  yield takeEvery(sagaActions.EDIT_COMMENT_SAGA, editCommentSaga);
  yield takeEvery(sagaActions.DELETE_COMMENT_SAGA, deleteCommentSaga);
}
