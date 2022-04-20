import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ onChange, value, onClearSearch }) => {
    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={handleSearchSubmit}>
            <div
                style={{
                    position: "relative"
                }}
            >
                <label htmlFor="search"></label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    value={value}
                    onChange={onChange}
                    className="form-control w-100"
                    placeholder="Search..."
                />
                <span
                    onClick={onClearSearch}
                    role="button"
                    style={{
                        position: "absolute",
                        padding: "0 5px",
                        right: "0px",
                        top: "30px"
                    }}
                >
                    &times;
                </span>
            </div>
        </form>
    );
};

SearchInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    onClearSearch: PropTypes.func
};

export default SearchInput;
