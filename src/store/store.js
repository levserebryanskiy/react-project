import { createStore } from 'redux';
import reducer from './reducer';

const addStore = () => {
  const store = createStore(reducer);
  return store;
};

export default addStore;
