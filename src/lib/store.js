import { createStore } from 'redux';

import reducer from 'lib/reducer';

export default (initial) => createStore(reducer, initial);
