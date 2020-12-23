import Axios, {AxiosRequestConfig} from 'axios';

import {BASE_URL, PASSWORD, USERNAME} from '../utils/constants';

export const createRequest = async (axiosRequest: AxiosRequestConfig) => {
  axiosRequest.auth = {
    username: USERNAME,
    password: PASSWORD,
  };

  axiosRequest.baseURL = BASE_URL;

  if (axiosRequest.url) {
    if (axiosRequest.method === 'GET') {
      return await Axios.get(axiosRequest.url, axiosRequest);
    } else if (axiosRequest.method === 'POST') {
      return await Axios.post(
        axiosRequest.url,
        axiosRequest.data,
        axiosRequest,
      );
    }
  }
};
