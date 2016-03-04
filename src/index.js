'use strict';

const _ = require('lodash');
const { createStore, combineReducers } = require('redux');
const { createSelector } = require('reselect');

function framework(reducers, initialState) {
  const selectorMap = new Map();

  const reducer = _.isFunction(reducers) ? reducers : combineReducers(reducers);

  const store = createStore(reducer, initialState);

  const { replaceReducer, dispatch } = store;

  function getState(predicate, result = _.identity) {

    let selector;

    if (selectorMap.has(predicate)) {
      selector = selectorMap.get(predicate);
    } else {
      selector = createSelector(_.iteratee(predicate), result);
      selectorMap.set(predicate, selector);
    }

    return selector(store.getState());
  }

  function subscribe(predicate, listener) {
    let previousState = getState(predicate);

    function predicateListener() {
      const state = getState(predicate);

      if (state !== previousState) {
        listener(state);
      }

      previousState = state;
    }

    return store.subscribe(predicateListener);
  }

  return {
    // From Redux
    replaceReducer,
    dispatch,
    // Upgraded!
    getState,
    subscribe
  };
}

module.exports = framework;
