import React from "react";
import PropTypes from "prop-types";
import PropetiesList from "../common/propertiesList";
import Category from "./category";

const ProductCard = ({ product }) => {
    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <h1>{product.name}</h1>
                    <Category id={product.category} />
                    <PropetiesList properties={product.property} />
                    <p>
                        <img
                            style={{
                                height: "300px",
                                maxWidth: "210px",
                                objectFit: "cover"
                            }}
                            src={product.image}
                            alt="photo"
                        />
                    </p>
                    <p>Описание товара: {product.description}</p>
                    <p>На складе: {product.inStock} шт.</p>
                    <p>Цена: ${product.price}</p>
                </div>
            </div>
        </>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object
};
export default ProductCard;
