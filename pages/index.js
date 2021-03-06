import React from 'react';

import LoginContainer from 'containers/Login';

class Home extends React.Component {
    static async getInitialProps() {
        const props = {
            namespacesRequired: ['login'],
        };

        return props;
    }

    render() {
        return (
            <LoginContainer />
        );
    }
}

export default Home;
