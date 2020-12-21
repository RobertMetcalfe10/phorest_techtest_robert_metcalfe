import {takeEvery} from 'redux-saga/effects';
import {call} from 'redux-saga-test-plan/matchers';

function* createVoucherStart() {
  console.log('SAGA_VOUCHER!!!');
  // const result = yield call(
  //   fetch,
  //   'https://jsonplaceholder.typicode.com/todos/1',
  // );
  // console.log(result);
}

export default function* voucherSaga() {
  yield takeEvery('voucher/createVoucherStart', createVoucherStart);
}
