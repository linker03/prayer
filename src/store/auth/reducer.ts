import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function storeToken(value: string) {
  try {
    await AsyncStorage.setItem('@token', value);
  } catch (e) {
    console.log(e);
  }
}

async function removeToken() {
  try {
    await AsyncStorage.removeItem('@token');
  } catch (e) {
    console.log(e);
  }
}

interface authInitial {
  token: string;
  onLogin: boolean;
  error: boolean;
}

const initialStateParams: authInitial = {
  token: '',
  onLogin: false,
  error: false,
};

interface loginPayload {
  token: string;
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialStateParams,
  reducers: {
    setLogin: (state, action: PayloadAction<loginPayload>) => {
      storeToken(action.payload.token);
      console.log('setLogin', action);
      return {
        ...state,
        token: action.payload.token,
        onLogin: true,
      };
    },
    setError: (state) => {
      return {
        ...state,
        error: true,
      };
    },
    checkLogin: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        onLogin: true,
      };
    },
    logout: (state) => {
      removeToken();
      return {
        ...state,
        onLogin: false,
        token: '',
      };
    },
  },
});

export const {setLogin, setError, checkLogin, logout} = authSlice.actions;
