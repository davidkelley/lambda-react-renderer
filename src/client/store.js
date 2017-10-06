import Reducers from './reducers';
import { createStore } from 'redux';

const configureStore = (state) => createStore(Reducers, state);

export { configureStore };
