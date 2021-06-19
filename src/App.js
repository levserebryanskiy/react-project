import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Listcomp from './comp/list';
import CategoryComp from './comp/сategory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Listcomp} />
        <Route exact path="/addcategory" component={CategoryComp} />
      </BrowserRouter>
    </div>
  );
}

export default App;
