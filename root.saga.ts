import {all, fork} from 'redux-saga/effects';

import clientSaga from './state/client/client.saga';
import voucherSaga from './state/voucher/voucher.saga';

export default function* rootSaga() {
  yield all([clientSaga, voucherSaga].map((saga) => fork(saga)));
}
