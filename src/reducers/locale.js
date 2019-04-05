import initial from 'state.initial';
import { CHANGE_LOCALE } from 'actions/locale';
import { i18n } from 'lib/i18n';

export default function map(state = initial.locale, { type }) {
    switch (type) {
        case CHANGE_LOCALE:
            return i18n.language;

        default:
            return state;
    }
}
