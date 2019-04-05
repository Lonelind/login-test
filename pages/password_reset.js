import React from 'react';

import PasswordResetContainer from 'containers/PasswordReset';

class PasswordReset extends React.Component {
    static async getInitialProps() {
        const props = {
            namespacesRequired: ['login'],
        };

        return props;
    }

    render() {
        return (
            <PasswordResetContainer />
        );
    }
}

export default PasswordReset;
