import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/pages/productPage";
import ProductsList from "../components/pages/productsList";

const Products = () => {
    const { productId } = useParams();
    return (
        <>
            {productId ? (
                <ProductPage productId={productId} />
            ) : (
                <ProductsList />
            )}
        </>
    );
};

export default Products;
