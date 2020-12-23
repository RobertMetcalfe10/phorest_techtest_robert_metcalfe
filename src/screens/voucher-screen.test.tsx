import React from 'react';
import configureStore, {MockStore} from 'redux-mock-store';
import {fireEvent, render} from '@testing-library/react-native';

import {State} from '../state/store';
import {wrapComponentWithReduxAndKitten} from '../utils/helpers';

import VoucherScreen from './voucher-screen';

const state: State = {
  client: {clients: [], selectedClient: undefined, selectedClientId: undefined},
  voucher: {createdVoucher: undefined, balance: undefined},
};
const mockStore = configureStore([]);
const store: MockStore = mockStore({...state});

const component = wrapComponentWithReduxAndKitten(<VoucherScreen />, store);

describe('VoucherScreen', () => {
  it('renders', () => {
    expect(() => render(component)).not.toThrowError();
  });

  it('typing in amount sets balance', () => {
    const {getByTestId} = render(component);

    const input = getByTestId('input');
    fireEvent.changeText(input, '10.50');
    const action = store.getActions().pop();
    expect(action).toEqual({
      type: 'voucher/setBalance',
      payload: 10.5,
    });
    expect(input.props.value).toBe('10.50');
  });

  it('typing in incorrectly formatted amount does not change value', () => {
    const {getByTestId} = render(component);

    const input = getByTestId('input');
    fireEvent.changeText(input, 'abc');
    const action = store.getActions().pop();
    expect(action).toEqual({
      type: 'voucher/setBalance',
      payload: NaN,
    });
    expect(input.props.value).toBe('');
  });

  it('pressing create voucher creates a voucher for client', () => {
    const {getByTestId} = render(component);

    const button = getByTestId('button');
    fireEvent.press(button);
    const action = store.getActions().pop();
    expect(action).toEqual({
      type: 'voucher/createVoucher',
    });
  });
});
