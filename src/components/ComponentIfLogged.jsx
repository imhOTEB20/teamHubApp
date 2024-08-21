import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

function ComponentIfLogged({ childrenIfLogged, childrenIfNotLogged }) {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? childrenIfLogged : childrenIfNotLogged;
}

ComponentIfLogged.propTypes = {
    childrenIfLogged: PropTypes.node.isRequired,
    childrenIfNotLogged: PropTypes.node.isRequired,
};

export default ComponentIfLogged;
