import {takeEvery} from 'redux-saga/effects';
import {call} from 'redux-saga-test-plan/matchers';

function* searchForClientStart() {
  console.log('SAGA!!!');
  // const result = yield call(
  //   fetch,
  //   'https://jsonplaceholder.typicode.com/todos/1',
  // );
  // console.log(result);
}

export default function* clientSaga() {
  yield takeEvery('client/searchForClientStart', searchForClientStart);
}
