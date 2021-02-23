import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
  },
});

export const {setLogin, setError} = authSlice.actions;
