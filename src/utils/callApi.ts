import Axios from 'axios';

type callAPIType = {
  url: string;
  method: string;
  data: any;
  headers: any;
};

export const callAPI = async ({url, method, data, headers}: any) => {
  return await Axios({
    url,
    method,
    data,
    headers,
  });
};
