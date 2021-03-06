import {AxiosRequestConfig} from 'axios';

import {createRequest} from './http-client';

export const searchForClientRequest = (email: string) => {
  const request: AxiosRequestConfig = {
    url: 'client',
    params: {email},
    method: 'GET',
  };
  return createRequest(request);
};
