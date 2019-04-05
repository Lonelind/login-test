import { combineReducers } from 'redux';

import login from 'reducers/login';
import map from 'reducers/map';
import locale from 'reducers/locale';

export default combineReducers({
    login,
    map,
    locale,
});
