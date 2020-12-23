import React, {ReactNode} from 'react';
import {Provider} from 'react-redux';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {MockStore} from 'redux-mock-store';

export const emailIsValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const wrapComponentWithReduxAndKitten = (
  component: ReactNode,
  store: MockStore,
) => (
  <ApplicationProvider {...eva} theme={{...eva.light}}>
    <Provider store={store}>{component}</Provider>
  </ApplicationProvider>
);
