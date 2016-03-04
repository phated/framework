'use strict';

const _ = require('lodash');

const framework = require('./src/index');

function test(state = { blah: 123 }, { type }) {
  switch(type) {
    default:
      return state;
  }
}

function drawer(state = { isOpen: false }, { type }) {
  switch(type) {
    case 'OPEN_DRAWER':
      return _.assign({}, state, { isOpen: true });
    default:
      return state;
  }
}

const api = framework({ test, drawer });

window.api = api;
window.framework = framework;
