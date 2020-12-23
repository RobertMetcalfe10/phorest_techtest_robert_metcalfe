import {AxiosRequestConfig} from 'axios';

import {Voucher} from '../state/voucher/voucher.state';

import {createRequest} from './http-client';

export const createVoucherRequest = (voucher: Voucher) => {
  const request: AxiosRequestConfig = {
    url: 'voucher',
    data: voucher,
    method: 'POST',
  };
  return createRequest(request);
};
