import {expectSaga} from 'redux-saga-test-plan';

import {searchForClientRequest} from '../../api/client.api';

import {Client} from './client.state';
import ClientState from './client.state';
import ClientSaga from './client.saga';

const mockClient: Client = {
  firstName: 'testFirstName',
  lastName: 'testLastName',
  clientId: 'testClientId',
  email: 'test@email.com',
  clientSince: '',
  createdAt: '',
  gender: '',
  mobile: '',
  notes: '',
  preferredStaffId: '',
  updatedAt: '',
};

jest.mock('src/api/client.api', () => ({
  searchForClientRequest: jest.fn(() => {
    return {
      data: {
        _embedded: {
          clients: [mockClient, mockClient],
        },
      },
    };
  }),
}));

describe('ClientSaga', () => {
  it('searchForClient succeeds', async () => {
    await expectSaga(ClientSaga)
      .call(searchForClientRequest, 'test@email.com')
      .put(ClientState.actions.searchForClientSuccess([mockClient, mockClient]))
      .dispatch(
        // @ts-ignore
        ClientState.actions.searchForClient('test@email.com'),
      )
      .run();
  });
  it('searchForClient fails', async () => {
    (searchForClientRequest as jest.Mock).mockImplementationOnce(
      jest.fn(() => {
        return {
          error: {},
        };
      }),
    );

    await expectSaga(ClientSaga)
      .call(searchForClientRequest, 'test@email.com')
      .put(ClientState.actions.searchForClientFailure())
      .dispatch(
        // @ts-ignore
        ClientState.actions.searchForClient('test@email.com'),
      )
      .run();
  });
});
