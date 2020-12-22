import {takeEvery} from 'redux-saga/effects';
import {call, put, select} from 'redux-saga-test-plan/matchers';
import {DateTime} from 'luxon';
import {showMessage} from 'react-native-flash-message';

import {createVoucherRequest} from 'src/api/voucher.api';
import {
  Client,
  selectedClientIdSelector,
  selectedClientSelector,
} from 'src/state/client/client.state';

import VoucherState, {
  balanceSelector,
  createdVoucherSelector,
  Voucher,
} from './voucher.state';

const BRANCH_ID = 'SE-J0emUgQnya14mOGdQSw';

function* createVoucher() {
  const selectedClientId = yield select(selectedClientIdSelector);
  const selectedClient = yield select(selectedClientSelector) as Client;
  const balance = yield select(balanceSelector);
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
    const createdVoucher = yield select(createdVoucherSelector) as Voucher;
    yield call(showMessage, {
      message: 'Voucher created successfully',
      description: `${selectedClient.firstName} ${selectedClient.lastName}\nBalance: €${createdVoucher.originalBalance}`,
      type: 'success',
      duration: 2500,
    });
  } else {
    yield put(VoucherState.actions.createVoucherFailure);
    yield call(showMessage, {
      message: 'Voucher creation failed',
      type: 'danger',
    });
  }
}

export default function* voucherSaga() {
  yield takeEvery('voucher/createVoucher', createVoucher);
}
