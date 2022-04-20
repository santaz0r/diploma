import React, { useEffect, useState } from "react";
import { paginate } from "../../../utils/paginate";
import CategoriesList from "../../common/groupList";
import _ from "lodash";
import Pagination from "../../common/pagination";
import ProductsCard from "../../common/productCards";
import SearchInput from "../../ui/searchInput";
import SortBy from "../../common/sortBy";
import { useSelector } from "react-redux";
import {
    getCategories,
    getCategoriesLoadingStatus
} from "../../../store/categories";
import { getProductsList } from "../../../store/products";

const sortByInitState = { iter: "_id", order: "asc" };

const ProductsList = () => {
    const [currentPage, setCurrentpage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState();
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState(sortByInitState);
    const products = useSelector(getProductsList());

    const categories = useSelector(getCategories());
    const isLoadingCategoryStatus = useSelector(getCategoriesLoadingStatus());

    useEffect(() => {
        setCurrentpage(1);
    }, [selectedCategory]);
    const pageSize = 3;
    const handlePageChange = (page) => {
        setCurrentpage(page);
    };
    const handleSelect = (item) => {
        setSelectedCategory(item);
        setSortBy(sortByInitState);
    };
    const clearFilter = () => {
        setSelectedCategory(undefined);
    };
    const handleClearSearch = () => {
        setSearch("");
    };
    const handleChange = ({ target }) => {
        setSearch(target.value);
    };
    const clearSort = () => {
        setSortBy(sortByInitState);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    function filteredData(data) {
        const filteredProducts =
            selectedCategory && search
                ? data.filter(
                      (product) =>
                          JSON.stringify(product.category) ===
                              JSON.stringify(selectedCategory._id) &&
                          product.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                  )
                : search
                ? data.filter((prod) =>
                      prod.name.toLowerCase().includes(search.toLowerCase())
                  )
                : selectedCategory
                ? data.filter(
                      (product) =>
                          JSON.stringify(product.category) ===
                          JSON.stringify(selectedCategory._id)
                  )
                : data;
        return filteredProducts;
    }
    if (products) {
        const filteredProducts = filteredData(products);
        const itemsCount = filteredProducts.length;
        const sortedProducts = _.orderBy(
            filteredProducts,
            [sortBy.iter],
            [sortBy.order]
        );

        const productsCrop = paginate(sortedProducts, currentPage, pageSize);

        return (
            <div className="container">
                <div className="row">
                    <SortBy
                        onSort={handleSort}
                        onClearSort={clearSort}
                        iter={sortBy.iter}
                        currentSortBy={sortBy.iter}
                        currentSortOrder={sortBy.order}
                    />
                </div>
                <div className="row">
                    <div className="col-md-3 mt-4">
                        {categories && !isLoadingCategoryStatus && (
                            <CategoriesList
                                items={categories}
                                selectedItem={selectedCategory}
                                onItemSelect={handleSelect}
                            />
                        )}
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>{" "}
                    </div>
                    <div className="col-md-6">
                        <SearchInput
                            onChange={handleChange}
                            value={search}
                            onClearSearch={handleClearSearch}
                        />
                        <ProductsCard products={productsCrop} />
                        <Pagination
                            itemsCount={itemsCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading";
};

export default ProductsList;
