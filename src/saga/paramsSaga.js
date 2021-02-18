import {put, takeEvery, call} from 'redux-saga/effects';
import Axios from 'axios';
import {setLogin, setError} from '../redux/store';
import {sagaActions} from './sagaActions';

let callAPI = async ({url, method, data, headers}) => {
  return await Axios({
    url,
    method,
    data,
    headers,
  });
};

export function* loginSaga(action) {
  try {
    const response = yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/auth/sign-in`,
        method: 'post',
        data: {
          email: action.payload.email,
          password: action.payload.password,
        },
      }),
    );
    console.log('RESPONSE', JSON.stringify(response.data.name, null, 2));
    if (response.data.name == 'EntityNotFound') {
      yield put(setError());
    } else {
      yield put(setLogin({token: response.data.token}));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* createUserSaga(action) {
  try {
    const response = yield call(() =>
      callAPI({
        url: `http://trello-purrweb.herokuapp.com/auth/sign-up`,
        method: 'post',
        data: {
          email: action.payload.email,
          name: action.payload.name,
          password: action.payload.password,
        },
      }),
    );
    console.log('RESPONSE', JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
}

export default function* paramsWatcher() {
  yield takeEvery(sagaActions.LOGIN_USER_SAGA, loginSaga);
  yield takeEvery(sagaActions.CREATE_NEW_USER_SAGA, createUserSaga);
}
