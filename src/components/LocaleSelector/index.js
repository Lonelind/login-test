import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem } from '@material-ui/core';

import Wrapper from './components/Wrapper';
import LocaleItem from './components/LocaleItem';

export default class LocaleSelector extends React.Component {
    static propTypes = {
        locales: PropTypes.arrayOf(PropTypes.string).isRequired,
        currentLocale: PropTypes.string.isRequired,
        onChangeLocale: PropTypes.func,
    };

    static defaultProps = {
        onChangeLocale: () => { },
    };

    constructor(props) {
        super(props);

        const { currentLocale: locale } = props;

        this.state = {
            locale,
        };
    }

    handleChangeLocale = (evt) => {
        const { onChangeLocale } = this.props;
        const { target: { value: newLocale } } = evt;

        onChangeLocale(newLocale);
        this.setState({
            locale: newLocale,
        });
    };

    renderValue(locale) {
        return (
            <LocaleItem>
                {locale.toUpperCase()}
            </LocaleItem>
        );
    }

    render() {
        const { locales } = this.props;
        const { locale } = this.state;

        return (
            <Wrapper>
                <Select
                    value={locale}
                    onChange={this.handleChangeLocale}
                    renderValue={this.renderValue}
                    fullWidth
                >
                    {locales.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.toUpperCase()}
                        </MenuItem>
                    ))}
                </Select>
            </Wrapper>
        );
    }
}
