import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import { validator } from "../../../utils/validator";
import MultiSelectField from "../../common/form/multiSelect";
import { useDispatch, useSelector } from "react-redux";
import {
    getProperties,
    getPropertiesByIds,
    getPropertiesLoadingStatus
} from "../../../store/properties";
import {
    getCategories,
    getCategoriesLoadingStatus
} from "../../../store/categories";
import { getProductById, updateProductData } from "../../../store/products";

const EditProductPage = () => {
    const { productId } = useParams();

    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const categories = useSelector(getCategories());
    const categoriesLoading = useSelector(getCategoriesLoadingStatus());

    const properties = useSelector(getProperties());
    const propertiesLoading = useSelector(getPropertiesLoadingStatus());

    const dispatch = useDispatch();
    const product = useSelector(getProductById(productId));

    const transformData = (data) => {
        if (data) {
            return data.map((prop) => ({
                label: prop.name,
                value: prop._id
            }));
        }
    };
    const propertiesList = useSelector(getPropertiesByIds(product.property));

    useEffect(() => {
        if (!categoriesLoading && !propertiesLoading && product && !data) {
            setData(() => ({
                ...product,
                property: transformData(propertiesList)
            }));
        }
    }, [categoriesLoading, propertiesLoading, product, data]);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

    useEffect(() => {
        validate();
    }, [data]);
    const validatorConfig = {
        name: {
            isRequired: {
                message: "?????? ?????????????????????? ?????? ????????????????????"
            }
        },
        description: {
            isRequired: {
                message: "???????????????? ?????????????????????? ?????? ????????????????????"
            }
        },
        inStock: {
            isRequired: {
                message: "?????????????? ???????????????????? ???? ????????????"
            },
            isDigit: {
                message: "?????????????? ???????????? ??????????"
            }
        },
        price: {
            isRequired: {
                message: "?????????????? ???????? ????????????"
            },
            isDigit: {
                message: "?????????????? ???????????? ??????????"
            }
        },
        rate: {
            isRequired: {
                message: "?????????????? ?????????????? ????????????"
            },
            isDigit: {
                message: "?????????????? ???????????? ??????????"
            }
        },
        image: {
            isRequired: {
                message: "?????????????????????? ??????????????????????"
            },
            isUrl: {
                message: "?????????????????????? ???????????? url"
            }
        },
        category: {
            isRequired: {
                message: "?????????????????? ?????????????????????? ?????? ????????????????????"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            property: data.property.map((p) => p.value),
            _id: productId
        };

        dispatch(updateProductData(newData));
    };

    if (!isLoading && !propertiesLoading) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="???????????????????????? ????????????????"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="???????????????? ????????????????"
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                                error={errors.description}
                            />
                            <TextField
                                label="????????"
                                name="price"
                                value={data.price}
                                onChange={handleChange}
                                error={errors.price}
                            />
                            <TextField
                                label="???????????????????? ???? ????????????"
                                name="inStock"
                                value={data.inStock}
                                onChange={handleChange}
                                error={errors.inStock}
                            />
                            <TextField
                                label="?????????????? ????????????????"
                                name="rate"
                                value={data.rate}
                                onChange={handleChange}
                                error={errors.rate}
                            />
                            <TextField
                                label="???????????????? ???????????? ???? ??????????????????????"
                                name="image"
                                value={data.image}
                                onChange={handleChange}
                                error={errors.image}
                            />
                            <SelectField
                                defaultOption="??????????????...."
                                options={transformData(categories)}
                                label="???????????????? ??????????????????"
                                onChange={handleChange}
                                value={data.category}
                                name="category"
                                error={errors.category}
                            />
                            <MultiSelectField
                                options={transformData(properties)}
                                onChange={handleChange}
                                defaultValue={data.property}
                                name="property"
                                label="???????????????? ????????????"
                            />

                            <button
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return "loading";
};

export default EditProductPage;
