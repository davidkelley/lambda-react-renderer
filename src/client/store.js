import Reducers from './reducers';
import { createStore } from 'redux';

const configureStore = (...args) => createStore(Reducers, ...args);

export { configureStore };
