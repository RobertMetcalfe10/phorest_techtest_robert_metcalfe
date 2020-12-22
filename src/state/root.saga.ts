import {all, fork} from 'redux-saga/effects';

import clientSaga from './client/client.saga';
import voucherSaga from './voucher/voucher.saga';

export default function* rootSaga() {
  yield all([clientSaga, voucherSaga].map((saga) => fork(saga)));
}
