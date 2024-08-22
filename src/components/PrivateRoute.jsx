import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";

function PrivateRoute({ children }) {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to='/' />;
}
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default PrivateRoute;