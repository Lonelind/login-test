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
    Link as UILink,
    Button,
} from '@material-ui/core';

import { withNamespaces } from 'lib/i18n';
import { changeEmail } from 'actions/login';

import ResetFooter from './components/ResetFooter';

class PasswordResetContainer extends React.Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        login: PropTypes.shape({
            email: PropTypes.string,
            password: PropTypes.string,
        }).isRequired,
        handleChangeEmail: PropTypes.func.isRequired,
        t: PropTypes.func.isRequired,
        ...WithRouterProps,
    };

    onChangeEmail = (evt) => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.handleChangeEmail(evt.target.value);
    };

    onFormSubmit = (evt) => {
        evt.preventDefault();
        // eslint-disable-next-line react/destructuring-assignment
        console.log('RECOVER PASSWORD', this.props.login.email);
    };

    render() {
        const {
            className,
            login: {
                email,
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
                    {t('resetTitle')}
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
                        <ResetFooter>
                            <Link href={{ pathname: '/', query }} prefetch>
                                <UILink
                                    variant="body2"
                                    underline="hover"
                                    classes={{ root: 'link' }}
                                >
                                    {t('remembered')}
                                </UILink>
                            </Link>
                        </ResetFooter>
                        <Button
                            color="primary"
                            size="large"
                            variant="contained"
                            type="submit"
                            focusRipple
                            fullWidth
                        >
                            {t('resetPassword')}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
}

const StyledPasswordResetContainer = styled(PasswordResetContainer)`
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
        }),
    ),
    withRouter,
    withNamespaces('login'),
)(StyledPasswordResetContainer);
