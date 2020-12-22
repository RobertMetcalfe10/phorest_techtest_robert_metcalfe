import {takeEvery} from 'redux-saga/effects';
import {call} from 'redux-saga-test-plan/matchers';

function* createVoucherStart() {
  // const result = yield call(
  //   fetch,
  //   'https://jsonplaceholder.typicode.com/todos/1',
  // );
}

export default function* voucherSaga() {
  yield takeEvery('voucher/createVoucherStart', createVoucherStart);
}
