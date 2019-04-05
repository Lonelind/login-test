export const CHANGE_MAP = 'CHANGE_MAP';

export function changeMap({ coords, zoom }) {
    return {
        type: CHANGE_MAP,
        coords,
        zoom,
    };
}
