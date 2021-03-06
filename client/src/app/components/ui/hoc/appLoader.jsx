import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadCategoriesList } from "../../../store/categories";
import {
    getProductsLoadingStatus,
    loadProductsList
} from "../../../store/products";
import { loadPropertiesList } from "../../../store/properties";
import { getIsLoggedIn, loadUsersList } from "../../../store/users";
const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const productsStatusLoading = useSelector(getProductsLoadingStatus());
    const isLoggedIn = useSelector(getIsLoggedIn());
    useEffect(() => {
        dispatch(loadPropertiesList());
        dispatch(loadCategoriesList());
        dispatch(loadProductsList());
        dispatch(loadUsersList());
    }, [isLoggedIn]);
    if (productsStatusLoading) return "loading";
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
