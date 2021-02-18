import {RootState} from '../redux/store';

export const getToken = (state: RootState) => state.paramsStore.token;
