import React from "react";
import PropTypes from "prop-types";
import { translateText } from "../../utils/translateText";

const SortBy = ({
    iter,
    currentSortBy,
    onClearSort,
    currentSortOrder,
    onSort,
    options
}) => {
    const handleSort = (item) => {
        if (iter === item) {
            onSort((prevState) => ({
                ...prevState,
                order: prevState.order === "asc" ? "desc" : "asc"
            }));
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    const renderArrow = (title, currentSortOrder) => {
        if (currentSortBy === title) {
            if (currentSortOrder === "asc") {
                return <i className="bi bi-caret-up-fill"></i>;
            } else {
                return <i className="bi bi-caret-down-fill"></i>;
            }
        }
    };
    return (
        <ul className="nav justify-content-center align-items-baseline">
            <div className="nav-item">Отсортировать по: </div>
            {options.map((item) => (
                <li key={item} className="nav-item">
                    <p
                        role={"button"}
                        onClick={() => handleSort(item)}
                        className={
                            "nav-link" +
                            (currentSortBy === item
                                ? " text-decoration-underline"
                                : "")
                        }
                        aria-current="page"
                    >
                        {translateText(item)}
                        {renderArrow(item, currentSortOrder)}
                    </p>
                </li>
            ))}
            <button className="btn btn-primary" onClick={onClearSort}>
                Сбросить
            </button>
        </ul>
    );
};

SortBy.defaultProps = {
    options: ["name", "price", "rate"]
};
SortBy.propTypes = {
    iter: PropTypes.string.isRequired,
    onClearSort: PropTypes.func.isRequired,
    currentSortBy: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSortOrder: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
};
export default SortBy;
