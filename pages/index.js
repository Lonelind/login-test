import styled from 'styled-components';

import { withNamespaces } from '../i18n';

const Home = ({ className, t, ...props }) => (
    <div className={className}>
        {console.log(props)}
        Ready {t('appName')}
    </div>
);

Home.getInitialProps = () => ({
    namespacesRequired: ['common'],
});

export default styled(withNamespaces('common')(Home))`
    background: red;
`;