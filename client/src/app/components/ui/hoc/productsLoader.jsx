import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { loadProductsList, getDataStatus } from "../../../store/products";

const ProductsLoader = ({ children }) => {
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataStatus) dispatch(loadProductsList());
    }, []);
    if (!dataStatus) return "Loading";
    return children;
};

ProductsLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default ProductsLoader;
