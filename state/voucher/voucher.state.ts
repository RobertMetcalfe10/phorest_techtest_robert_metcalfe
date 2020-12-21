import {createSlice} from '@reduxjs/toolkit';

export interface VoucherInternalState {}

const voucherSlice = createSlice({
  name: 'voucher',
  initialState: [] as VoucherInternalState,
  reducers: {
    createVoucherStart(state, action) {},
    createVoucherSuccess(state, action) {},
    createVoucherFailure(state, action) {},
  },
});

export default voucherSlice;
