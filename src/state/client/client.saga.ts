import {takeEvery} from 'redux-saga/effects';
import {call, put} from 'redux-saga-test-plan/matchers';

import {searchForClientRequest} from './client.api';
import ClientState from './client.state';

interface Action {
  type: string;
}

export interface SearchForClientAction extends Action {
  payload: {
    email: string;
  };
}
function* searchForClient({payload: email}: SearchForClientAction) {
  const {data} = yield call(searchForClientRequest, email);
  if (data?._embedded?.clients) {
    yield put(ClientState.actions.searchForClientSuccess(data));
  } else {
    yield put(ClientState.actions.searchForClientFailure());
  }
}

export default function* clientSaga() {
  yield takeEvery('client/searchForClient', searchForClient);
}
