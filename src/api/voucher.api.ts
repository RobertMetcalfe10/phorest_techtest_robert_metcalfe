import {AxiosRequestConfig} from 'axios';

import {createRequest} from './http-client';
import {Voucher} from '../state/voucher/voucher.state';

export const createVoucherRequest = (voucher: Voucher) => {
  const request: AxiosRequestConfig = {
    url: 'voucher',
    data: voucher,
    method: 'POST',
  };
  return createRequest(request);
};
