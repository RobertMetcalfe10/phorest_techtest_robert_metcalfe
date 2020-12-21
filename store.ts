import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import ClientState, {ClientInternalState} from './state/client/client.state';
import VoucherState, {
  VoucherInternalState,
} from './state/voucher/voucher.state';
import rootSaga from './root.saga';

export interface State {
  client: ClientInternalState;
  voucher: VoucherInternalState;
}

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

const store = configureStore({
  reducer: {
    client: ClientState.reducer,
    voucher: VoucherState.reducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
