import React from "react";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
import ProductCard from "../../ui/productCard";
import Feedbacks from "../../ui/feedbacks";
import { useSelector } from "react-redux";
import { getProductById } from "../../../store/products";

const ProductPage = ({ productId }) => {
    const history = useHistory();
    const product = useSelector(getProductById(productId));
    const handleClick = () => {
        history.push("/products");
    };
    if (product) {
        return (
            <div className="container">
                <div className="">
                    <ProductCard product={product} />

                    <Feedbacks />
                    <button
                        className="btn btn-primary w-100 mb-2"
                        onClick={handleClick}
                    >
                        Все товары
                    </button>
                </div>
            </div>
        );
    }

    return <Redirect to="/products" />;
};

ProductPage.propTypes = {
    productId: PropTypes.string.isRequired
};
export default ProductPage;
