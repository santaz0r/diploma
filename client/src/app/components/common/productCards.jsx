import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import PropetiesList from "./propertiesList";
import Category from "../ui/category";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, getCurrentUserData } from "../../store/users";
import { toast } from "react-toastify";

const ProductsCard = ({ products }) => {
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();

    const toggleCartClass = (id) => {
        return inCart(id) ? "bi bi-star-fill" : "bi bi-star";
    };
    const toggleButtonText = (id) => {
        return inCart(id) ? "Убрать из корзины" : "Добавить в корзину";
    };

    function inCart(id) {
        return currentUser.cart.includes(id);
    }

    const handleClick = (id) => {
        if (!inCart(id)) {
            const newData = {
                ...currentUser,
                cart: [...currentUser.cart, id]
            };
            dispatch(updateCart(newData));
            toast.success("Товар добавлен в корзину");
        } else {
            const newData = {
                ...currentUser,
                cart: currentUser.cart.filter((item) => item !== id)
            };
            dispatch(updateCart(newData));
            toast.error("Товар удален из корзины");
        }
    };
    const history = useHistory();
    return products.map((product) => {
        return (
            <div
                key={product._id}
                className="card mb-3"
                style={{ position: "relative" }}
            >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={product.image}
                            className="img-fluid rounded-start"
                            alt="product photo"
                            style={{ maxHeight: "200px" }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text text-truncate">
                                {product.description}
                            </p>

                            <Category id={product.category} />

                            <PropetiesList properties={product.property} />

                            <p className="d-flex justify-content-between card-text">
                                <small className="text-muted">
                                    Рейтинг: {product.rate}
                                </small>
                                <small className="text-muted">
                                    Цена: ${product.price}
                                </small>
                            </p>
                            <div className="d-flex justify-content-between">
                                <button
                                    onClick={() => {
                                        history.push(
                                            `/products/${product._id}`
                                        );
                                    }}
                                    className="btn btn-primary"
                                    style={{ height: "40px" }}
                                >
                                    Подробнее
                                </button>
                                {currentUser && (
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleClick(product._id)}
                                    >
                                        {toggleButtonText(product._id)}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {currentUser && (
                    <i
                        className={toggleCartClass(product._id)}
                        style={{
                            position: "absolute",
                            padding: "0 5px",
                            right: "0px",
                            top: "0px"
                        }}
                    ></i>
                )}
            </div>
        );
    });
};

ProductsCard.propTypes = {
    products: PropTypes.array
};
export default ProductsCard;
