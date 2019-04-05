import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter, WithRouterProps } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    FormControlLabel,
    Checkbox,
    Link as UILink,
    Button,
} from '@material-ui/core';

import { withNamespaces } from 'lib/i18n';
import { changeEmail, changePassword, toggleRemember } from 'actions/login';

import LoginFooter from './components/LoginFooter';

class LoginContainer extends React.Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        login: PropTypes.shape({
            email: PropTypes.string,
            password: PropTypes.string,
        }).isRequired,
        handleChangeEmail: PropTypes.func.isRequired,
        handleChangePassword: PropTypes.func.isRequired,
        handleToggleRemember: PropTypes.func.isRequired,
        t: PropTypes.func.isRequired,
        ...WithRouterProps,
    };

    form = null;

    onChangeEmail = (evt) => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.handleChangeEmail(evt.target.value);
    };

    onChangePassword = (evt) => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.handleChangePassword(evt.target.value);
    };

    onToggleRemember = () => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.handleToggleRemember();
    };

    onFormSubmit = (evt) => {
        evt.preventDefault();
        // eslint-disable-next-line react/destructuring-assignment
        console.log('SUBMIT', this.props.login);
    };

    render() {
        const {
            className,
            login: {
                email,
                password,
            },
            router: { query },
            t,
        } = this.props;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open
                classes={{
                    root: className,
                    paper: 'login-container',
                }}
                BackdropProps={{
                    classes: {
                        root: 'b-drop',
                    },
                }}
            >
                <DialogTitle>
                    {t('title')}
                </DialogTitle>
                <DialogContent>
                    <form
                        ref={(form) => { this.form = form; }}
                        onSubmit={this.onFormSubmit}
                    >
                        <TextField
                            autoFocus
                            fullWidth
                            onChange={this.onChangeEmail}
                            required
                            value={email}
                            type="email"
                            name="email"
                            label={t('email')}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                autoComplete: 'username',
                            }}
                        />
                        <TextField
                            fullWidth
                            onChange={this.onChangePassword}
                            required
                            value={password}
                            label={t('password')}
                            type="password"
                            name="password"
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                autoComplete: 'current-password',
                            }}
                        />
                        <LoginFooter>
                            <FormControlLabel
                                control={(
                                    <Checkbox
                                        value="remember"
                                        onChange={this.onToggleRemember}
                                        name="remember"
                                        color="primary"
                                    />
                                )}
                                label={t('remember')}
                            />
                            <Link href={{ pathname: '/password_reset', query }} prefetch>
                                <UILink
                                    variant="body2"
                                    underline="hover"
                                    classes={{ root: 'link' }}
                                >
                                    {t('forgotPassword')}
                                </UILink>
                            </Link>
                        </LoginFooter>
                        <Button
                            color="primary"
                            size="large"
                            variant="contained"
                            type="submit"
                            focusRipple
                            fullWidth
                        >
                            {t('logIn')}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
}

const StyledLoginContainer = styled(LoginContainer)`
    pointer-events: none;

    .b-drop {
        pointer-events: none;
    }

    .login-container {
        pointer-events: all;
    }
`;

export default compose(
    connect(
        ({ login }) => ({ login }),
        (dispatch) => ({
            handleChangeEmail: (value) => dispatch(changeEmail(value)),
            handleChangePassword: (value) => dispatch(changePassword(value)),
            handleToggleRemember: () => dispatch(toggleRemember()),
        }),
    ),
    withRouter,
    withNamespaces('login'),
)(StyledLoginContainer);
