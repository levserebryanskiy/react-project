import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import addStore from './store/store';
import './App.css';
import Listcomp from './comp/list';

import CategoryComp from './comp/сategory';

const store = addStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={Listcomp} />
        <Route exact path="/addcategory" component={CategoryComp} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
