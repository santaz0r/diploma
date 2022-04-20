import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <Route
            {...rest}
            render={(props) => {
                if (currentUserId !== process.env.REACT_APP_ADMIN_SUCCESS) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default ProtectedRoute;
