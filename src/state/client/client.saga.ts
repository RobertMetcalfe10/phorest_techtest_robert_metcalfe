import {takeEvery} from 'redux-saga/effects';
import {call, put} from 'redux-saga-test-plan/matchers';

import {searchForClientRequest} from '../../api/client.api';

import ClientState from './client.state';

export interface SearchForClientAction {
  type: string;
  payload: {
    email: string;
  };
}

function* searchForClient({payload: email}: SearchForClientAction) {
  const {data} = yield call(searchForClientRequest, email);
  if (data?._embedded?.clients) {
    yield put(
      ClientState.actions.searchForClientSuccess(data?._embedded?.clients),
    );
  } else {
    yield put(ClientState.actions.searchForClientFailure());
  }
}

export default function* clientSaga() {
  yield takeEvery('client/searchForClient', searchForClient);
}
