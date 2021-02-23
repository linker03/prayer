import {put, takeEvery, call} from 'redux-saga/effects';
import {callAPI} from '../../utils/callApi';
import {setLogin, setError, checkLogin, logout} from './reducer';
import {sagaAuthActions} from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

type loginAction = {
  type: string;
  payload: {
    email: string;
    password: string;
  };
};

type userCreateAction = {
  type: string;
  payload: {
    email: string;
    name: string;
    password: string;
  };
};

export function* loginSaga(action: loginAction) {
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

export function* createUserSaga(action: userCreateAction) {
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

export function* checkLoginSaga() {
  try {
    const value = yield call(AsyncStorage.getItem, '@token');
    console.log('val', value);
    yield put(checkLogin({token: value}));
  } catch (error) {
    console.log(error);
  }
}

export function* logoutSaga() {
  try {
    yield put(logout());
  } catch (error) {
    console.log(error);
  }
}

export default function* authWatcher() {
  yield takeEvery(sagaAuthActions.LOGIN_USER_SAGA, loginSaga);
  yield takeEvery(sagaAuthActions.CREATE_NEW_USER_SAGA, createUserSaga);
  yield takeEvery(sagaAuthActions.CHECK_LOGIN, checkLoginSaga);
  yield takeEvery(sagaAuthActions.LOGOUT, logoutSaga);
}
