import initial from 'state.initial';

import { CHANGE_EMAIL, CHANGE_PASSWORD, TOGGLE_REMEMBER } from 'actions/login';

export default function login(state = initial.login, { type, email, password }) {
    switch (type) {
        case CHANGE_EMAIL:
            return {
                ...state,
                email,
            };

        case CHANGE_PASSWORD:
            return {
                ...state,
                password,
            };

        case TOGGLE_REMEMBER: {
            return {
                ...state,
                remember: !state.remember,
            };
        }

        default:
            return state;
    }
}
