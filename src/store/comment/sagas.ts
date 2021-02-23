import {put, takeEvery, call, select} from 'redux-saga/effects';
import {getAllComments} from './reducer';
import {sagaCommentActions} from './actions';
import {getToken} from './selectors';
import {callAPI} from '../../utils/callApi';
import {getCurrentDate} from '../../utils/getCurrentDate';

type createCommentAction = {
  type: string;
  payload: {cardId: number; body: string};
};

type editCommentAction = {
  type: string;
  payload: {commentId: number; body: string};
};

type deleteCommentAction = {
  type: string;
  payload: {commentId: number};
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

export function* createCommentSaga(action: createCommentAction) {
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

export function* editCommentSaga(action: editCommentAction) {
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

export function* deleteCommentSaga(action: deleteCommentAction) {
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
  yield takeEvery(sagaCommentActions.GET_COMMENTS_SAGA, getAllCommentsSaga);
  yield takeEvery(sagaCommentActions.CREATE_COMMENT_SAGA, createCommentSaga);
  yield takeEvery(sagaCommentActions.EDIT_COMMENT_SAGA, editCommentSaga);
  yield takeEvery(sagaCommentActions.DELETE_COMMENT_SAGA, deleteCommentSaga);
}
