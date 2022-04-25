import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserId, getUserById } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const currentUser = useSelector(getUserById(currentUserId));

    const isAdmin = currentUserId === process.env.REACT_APP_ADMIN_SUCCESS;

    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to={"/"}>
                            Главная
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={"/products"}>
                            Список товаров
                        </Link>
                    </li>
                </ul>
                <div className="d-flex align-items-center me-4">
                    {isAdmin && (
                        <Link className="nav-link" to={"/dashboard"}>
                            Панель управления
                        </Link>
                    )}
                    {currentUser ? (
                        <>
                            <Link to={"/cart"}>
                                Корзина <i className="bi bi-cart-fill"></i>
                            </Link>
                            <NavProfile isAdmin={isAdmin} />
                        </>
                    ) : (
                        <Link
                            className="nav-link"
                            aria-current="page"
                            to={"/login"}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
