import {RootState} from '../store';

export const getToken = (state: RootState) => state.authStore.token;
