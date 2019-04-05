export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const TOGGLE_REMEMBER = 'TOGGLE_REMEMBER';

export function changeEmail(email) {
    return {
        type: CHANGE_EMAIL,
        email,
    };
}

export function changePassword(password) {
    return {
        type: CHANGE_PASSWORD,
        password,
    };
}

export function toggleRemember() {
    return {
        type: TOGGLE_REMEMBER,
    };
}
