import React from 'react';
import configureStore, {MockStore} from 'redux-mock-store';
import {fireEvent, render} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

import {wrapComponentWithReduxAndKitten} from '../utils/helpers';
import {State} from '../state/store';
import {Client} from '../state/client/client.state';

import ClientScreen, {TEST_IDS} from './client-screen';

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

const state: State = {
  client: {clients: [], selectedClient: undefined, selectedClientId: undefined},
  voucher: {createdVoucher: undefined, balance: undefined},
};
const mockStore = configureStore([]);
const store: MockStore = mockStore({...state});

const component = wrapComponentWithReduxAndKitten(
  <ClientScreen navigation={{push: jest.fn()} as any} />,
  store,
);

describe('ClientScreen', () => {
  it('renders', () => {
    expect(() => render(component)).not.toThrowError();
  });

  it('typing in email searches for clients', () => {
    const {getByTestId} = render(component);

    const input = getByTestId('input');
    fireEvent.changeText(input, 'test@email.com');

    const action = store.getActions().pop();
    expect(action).toEqual({
      type: 'client/searchForClient',
      payload: 'test@email.com',
    });
  });

  it('typing in incorrect email does not search for clients', () => {
    const {getByTestId} = render(component);

    const input = getByTestId(TEST_IDS.input);
    fireEvent.changeText(input, 'testNotEmail');

    const action = store.getActions().pop();
    expect(action).not.toBeDefined();
  });

  it('clicking on a client goes to voucher screen', () => {
    const navigationSpy = jest.fn();
    const stateClone: State = {
      client: {
        clients: [mockClient],
        selectedClient: undefined,
        selectedClientId: undefined,
      },
      voucher: {createdVoucher: undefined, balance: undefined},
    };
    const storeClone: MockStore = mockStore({...stateClone});
    const {getByTestId} = render(
      wrapComponentWithReduxAndKitten(
        <ClientScreen navigation={{push: navigationSpy} as any} />,
        storeClone,
      ),
    );

    const listItem = getByTestId(TEST_IDS.listItem + 0);
    (listItem.children[2] as ReactTestInstance).props
      .component()
      .props.onPress();

    const action = storeClone.getActions().pop();
    expect(action).toEqual({
      type: 'client/setSelectedClient',
      payload: mockClient,
    });

    expect(navigationSpy).toBeCalledTimes(1);
    expect(navigationSpy).toBeCalledWith('VoucherScreen');
  });
});
