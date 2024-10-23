import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './Applnner';

function App() {
  return (
    <Provider store={store}>
      <>
        <AppInner />
      </>
    </Provider>
  );
}

export default App;
