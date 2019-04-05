import initial from 'state.initial';
import { CHANGE_MAP } from 'actions/map';

export default function map(state = initial.map, { type, zoom, coords }) {
    const newState = { ...state };

    switch (type) {
        case CHANGE_MAP:
            if (typeof zoom === 'number') {
                newState.zoom = zoom;
            }

            if (coords.length === 2) {
                newState.coords = coords;
            }

            return newState;

        default:
            return state;
    }
}
