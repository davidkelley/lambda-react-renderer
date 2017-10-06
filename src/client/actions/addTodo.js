import { ADD_TODO } from '../constants';

export default function({ text }) {
  return {
    type: ADD_TODO,
    payload: {
      text,
    },
  };
}
