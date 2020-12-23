import {takeEvery} from 'redux-saga/effects';
import {call, put, select} from 'redux-saga-test-plan/matchers';
import {DateTime} from 'luxon';
import {showMessage} from 'react-native-flash-message';

import {createVoucherRequest} from '../../api/voucher.api';
import {BRANCH_ID} from '../../utils/constants';
import {
  Client,
  selectedClientIdSelector,
  selectedClientSelector,
} from '../client/client.state';

import VoucherState, {balanceSelector, Voucher} from './voucher.state';

function* createVoucher() {
  const selectedClientId = yield select(selectedClientIdSelector);
  const selectedClient = yield select(selectedClientSelector) as Client;
  const balance = yield select(balanceSelector);
  if (isNaN(balance)) {
    yield call(showMessage, {
      message: 'Voucher creation failed',
      description: 'You must set an amount for the voucher',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  const voucher: Voucher = {
    clientId: selectedClientId,
    creatingBranchId: BRANCH_ID,
    originalBalance: balance,
    expiryDate: DateTime.local().plus({days: 7}).toString(),
    issueDate: DateTime.local().toString(),
  };
  const {data} = yield call(createVoucherRequest, voucher);
  if (data) {
    yield put(VoucherState.actions.createVoucherSuccess(data));
    yield call(showMessage, {
      message: 'Voucher created successfully',
      description: `${selectedClient.firstName} ${selectedClient.lastName}\nBalance: €${data.originalBalance}`,
      type: 'success',
      duration: 2500,
    });
  } else {
    yield put(VoucherState.actions.createVoucherFailure);
    yield call(showMessage, {
      message: 'Voucher creation failed',
      type: 'danger',
      duration: 2500,
    });
  }
}

export default function* voucherSaga() {
  yield takeEvery('voucher/createVoucher', createVoucher);
}
