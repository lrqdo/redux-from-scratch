export const createStore = (reducer, initialState) => {
  let state = initialState;

  const subscribers = [];

  const subscribe = callback => {
    subscribers.push(callback);
    return () => subscribers.filter(c => c !== callback);
  };

  const dispatch = action => {
    state = reducer(state, action);
    subscribers.forEach(callback => callback(state));
  };

  const getState = () => state;

  return {
    subscribe,
    getState,
    dispatch
  };
};
