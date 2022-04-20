import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../store/users";

const NavProfile = ({ isAdmin }) => {
    const currentUserId = useSelector(getCurrentUserId());
    const currentUser = useSelector(getUserById(currentUserId));

    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prev) => !prev);
    };
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt="avatar"
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                {isAdmin && (
                    <Link to={`/dashboard`} className="dropdown-item">
                        Dashboard
                    </Link>
                )}
                <Link to="/logout" className="dropdown-item">
                    Logout
                </Link>
            </div>
        </div>
    );
};
NavProfile.propTypes = {
    isAdmin: PropTypes.bool
};
export default NavProfile;
