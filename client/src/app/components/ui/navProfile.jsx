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
                <div className="me-2 position-relative">
                    {currentUser.name}
                    {isAdmin && (
                        <span
                            className="position-absolute top-360 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{ fontSize: "8px" }}
                        >
                            Admin
                            <span className="visually-hidden">
                                unread messages
                            </span>
                        </span>
                    )}
                </div>
                <div>
                    <img
                        src={currentUser.image}
                        alt="avatar"
                        height="40"
                        className="img-responsive rounded-circle"
                    />
                </div>
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                {isAdmin && (
                    <Link to={`/dashboard`} className="dropdown-item ">
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
