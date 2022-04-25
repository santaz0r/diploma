import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductsByIds } from "../../../store/products";
import { updateCart, getCurrentUserData } from "../../../store/users";
import Counter from "./counter";

const CartPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserData());
    const productsList = useSelector(getProductsByIds(currentUser.cart));
    const productsListWithValue = productsList.map((p) => ({
        ...p,
        value: 1
    }));
    const [counters, setCounters] = useState(productsListWithValue);
    const [totalPrice, setTotalprice] = useState(countPrice(counters));
    const handleCountTotal = (price, value) => {
        return price * value;
    };
    function countPrice(array) {
        return array.reduce((a, b) => {
            return a + b.price * b.value;
        }, 0);
    }
    const handleIncrement = (id) => {
        const productIndex = counters.findIndex((c) => c._id === id);
        const newCountersArr = [...counters];
        newCountersArr[productIndex].value++;
        setCounters(newCountersArr);

        setTotalprice(countPrice(newCountersArr));
    };
    const handleDecrement = (id) => {
        const productIndex = counters.findIndex((c) => c._id === id);
        const newCountersArr = [...counters];
        newCountersArr[productIndex].value--;
        setCounters(newCountersArr);
        setTotalprice(countPrice(newCountersArr));
    };
    const handleDelete = (id) => {
        const newCountersArr = counters.filter((c) => c._id !== id);
        setCounters(newCountersArr);
        const newData = {
            ...currentUser,
            cart: currentUser.cart.filter((item) => item !== id)
        };
        dispatch(updateCart(newData));
        setTotalprice(countPrice(newCountersArr));
        toast.error("Товар удален из корзины");
    };
    const handleClick = () => {
        history.push("/products");
    };
    if (productsList.length !== 0) {
        return (
            <div className="container">
                <h1>my cart</h1>

                {counters.map((p) => (
                    <Counter
                        key={p._id}
                        {...p}
                        value={p.value}
                        totalValue={handleCountTotal(p.price, p.value)}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onDelete={handleDelete}
                    />
                ))}
                <h1>Total price: ${totalPrice.toFixed(2)}</h1>
            </div>
        );
    }
    return (
        <div className="container">
            <h1>Вы ничего не добавили в корзину</h1>
            <button onClick={handleClick} className="btn btn-primary">
                Смотреть все товары
            </button>
        </div>
    );
};

export default CartPage;
