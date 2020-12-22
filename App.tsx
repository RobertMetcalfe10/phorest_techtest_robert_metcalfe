import React from 'react';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import store from './src/state/store';
import {colourPrimary, colourWhite} from './src/utils/constants';
import ClientScreen from './src/screens/client';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <ApplicationProvider {...eva} theme={{...eva.light}}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ClientScreen"
              options={{
                title: 'Find Client',
                headerStyle: {
                  backgroundColor: colourPrimary,
                },
                headerTintColor: colourWhite,
              }}
              component={ClientScreen}
            />
            <Stack.Screen
              name="Voucher"
              options={{
                title: 'Create Voucher',
                headerStyle: {
                  backgroundColor: colourPrimary,
                },
                headerTintColor: colourWhite,
              }}
              component={ClientScreen}
            />
          </Stack.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  );
};

export default App;
