import React from "react";
import PropTypes from "prop-types";

const Counter = ({
    _id: id,
    value,
    onIncrement,
    onDecrement,
    onDelete,
    totalValue,
    ...rest
}) => {
    const formatValue = () => {
        return value === 0 ? "empty" : value;
    };
    const getBadgeClasses = () => {
        let classes = "badge m-2 ";
        classes += value === 0 ? "bg-warning" : "bg-primary";
        return classes;
    };

    const handleIncrement = () => {
        onIncrement(id);
    };
    const handleDecrement = () => {
        onDecrement(id);
    };

    return (
        <div>
            <div>Наименование товара: {rest.name}</div>
            <div>Стоимость: ${rest.price}</div>
            <div>Количесвто для покупки:</div>
            <button
                className="btn btn-primary btn-sm m-2"
                onClick={handleDecrement}
                disabled={!value}
            >
                -
            </button>

            <span className={getBadgeClasses()}>{formatValue()}</span>
            <button
                className="btn btn-primary btn-sm m-2"
                onClick={handleIncrement}
                disabled={value >= rest.inStock}
            >
                +
            </button>
            <button
                className="btn btn-danger btn-sm m-2"
                onClick={() => onDelete(id)}
            >
                Delete
            </button>
            <div>Итого: ${totalValue} </div>
            <hr />
        </div>
    );
};

Counter.propTypes = {
    _id: PropTypes.string,
    value: PropTypes.number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
    onDelete: PropTypes.func,
    totalValue: PropTypes.number
};

export default Counter;
