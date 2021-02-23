import {callAPI} from './callApi';

export const refresh = (refreshType: string, token: string) => {
  return callAPI({
    url: `http://trello-purrweb.herokuapp.com/${refreshType}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
