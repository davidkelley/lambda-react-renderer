import { ADD_TODO, REMOVE_TODO } from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.merge({
        text: action.text,
        completed: false,
      });
    case REMOVE_TODO:
      return state.splice(action.id, 1);
    default:
      return state;
  }
};
