import {createSlice} from '@reduxjs/toolkit';

export interface Voucher {
  clientId: string;
  creatingBranchId: string;
  expiryDate: string;
  issueDate: string;
  originalBalance: number;
  serialNumber?: string;
}

export interface VoucherInternalState {
  createdVoucher?: Voucher;
  balance?: number;
}

const INITIAL_STATE: VoucherInternalState = {
  createdVoucher: undefined,
  balance: undefined,
};

const voucherSlice = createSlice({
  name: 'voucher',
  initialState: INITIAL_STATE,
  reducers: {
    clearVoucherState(state) {
      state.balance = undefined;
      state.createdVoucher = undefined;
    },
    setBalance(state, action) {
      state.balance = action.payload;
    },
    createVoucher() {},
    createVoucherSuccess(state, action) {
      state.createdVoucher = action.payload;
    },
    createVoucherFailure() {},
  },
});

export const createdVoucherSelector = ({
  voucher,
}: {
  voucher: VoucherInternalState;
}) => voucher.createdVoucher;

export const balanceSelector = ({voucher}: {voucher: VoucherInternalState}) =>
  voucher.balance;

export default voucherSlice;
