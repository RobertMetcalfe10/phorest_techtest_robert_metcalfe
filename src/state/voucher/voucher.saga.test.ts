import {expectSaga} from 'redux-saga-test-plan';
import {Settings} from 'luxon';
import {showMessage} from 'react-native-flash-message';

import {createVoucherRequest} from '../../api/voucher.api';
import {
  selectedClientIdSelector,
  selectedClientSelector,
} from '../client/client.state';

import VoucherState, {balanceSelector, Voucher} from './voucher.state';
import VoucherSaga from './voucher.saga';

Settings.now = () => new Date(2020, 11, 25).valueOf();

const mockVoucher: Voucher = {
  clientId: 'testClientId',
  creatingBranchId: 'SE-J0emUgQnya14mOGdQSw',
  expiryDate: '2021-01-01T00:00:00.000+00:00',
  issueDate: '2020-12-25T00:00:00.000+00:00',
  originalBalance: 100,
};

const state = {
  voucher: {
    createdVoucher: undefined,
    balance: 100,
  },
  client: {
    selectedClientId: 'testClientId',
    selectedClient: {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      clientId: 'testClientId',
    },
    clients: [],
  },
};

jest.mock('src/api/voucher.api', () => ({
  createVoucherRequest: jest.fn(() => ({data: {...mockVoucher}})),
}));

jest.mock('react-native-flash-message', () => ({
  showMessage: jest.fn(),
}));

describe('VoucherSaga', () => {
  it('createVoucher succeeds', async () => {
    await expectSaga(VoucherSaga)
      .withState(state)
      .select(selectedClientIdSelector)
      .select(selectedClientSelector)
      .select(balanceSelector)
      .call(createVoucherRequest, mockVoucher)
      .put(VoucherState.actions.createVoucherSuccess(mockVoucher))
      .call(showMessage, {
        message: 'Voucher created successfully',
        description: 'testFirstName testLastName\nBalance: €100',
        type: 'success',
        duration: 2500,
      })
      .dispatch(VoucherState.actions.createVoucher())
      .run();
  });
  it('createVoucher fails', async () => {
    (createVoucherRequest as jest.Mock).mockImplementationOnce(
      jest.fn(() => {
        return {
          error: {},
        };
      }),
    );
    await expectSaga(VoucherSaga)
      .withState(state)
      .select(selectedClientIdSelector)
      .select(selectedClientSelector)
      .select(balanceSelector)
      .call(createVoucherRequest, mockVoucher)
      .put(VoucherState.actions.createVoucherFailure)
      .call(showMessage, {
        message: 'Voucher creation failed',
        type: 'danger',
        duration: 2500,
      })
      .dispatch(VoucherState.actions.createVoucher())
      .run();
  });
});
