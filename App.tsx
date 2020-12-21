import React from 'react';
import {Provider} from 'react-redux';

import store from './store';
import Entry from './src/entry';

const App = () => {
  return <Provider store={store}>{<Entry />}</Provider>;
};

export default App;
