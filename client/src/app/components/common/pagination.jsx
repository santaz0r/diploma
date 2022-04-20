import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ pageSize, itemsCount, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        key={"page_" + page}
                        className={
                            "page-item" +
                            (page === currentPage ? " active" : "")
                        }
                    >
                        <button
                            className="page-link"
                            onClick={() => {
                                onPageChange(page);
                            }}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    pageSize: PropTypes.number,
    itemsCount: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func
};
export default Pagination;
