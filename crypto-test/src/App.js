import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import RoutePath from './routes';
import { Provider } from 'react-redux';
import store, { persistor } from './app/store';
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RoutePath />
      </PersistGate>
    </Provider>
  )

}

export default App;
