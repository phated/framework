'use strict';

const { createStore } = require('redux');

function framework(reducers, initialState) {
  const store = createStore(reducers, initialState);

  return store;
}

module.exports = framework;
