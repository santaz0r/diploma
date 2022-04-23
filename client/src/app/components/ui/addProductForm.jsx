import React, { useEffect, useState } from "react";
import MultiSelectField from "../common/form/multiSelect";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../store/properties";
import { getCategories } from "../../store/categories";
import { createProduct } from "../../store/products";

const initialState = {
    name: "",
    description: "",
    category: "",
    image: "",
    inStock: "",
    price: "",
    rate: "",
    property: []
};

const AddProductForm = () => {
    const [data, setData] = useState(initialState);

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const categories = useSelector(getCategories());
    const properties = useSelector(getProperties());

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const transformData = (data) => {
        if (data) {
            return data.map((qual) => ({
                label: qual.name,
                value: qual._id
            }));
        }
    };

    useEffect(() => {
        validate();
    }, [data]);
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        description: {
            isRequired: {
                message: "Описание Обязательно для заполнения"
            }
        },
        inStock: {
            isRequired: {
                message: "Введите количество на складе"
            },
            isDigit: {
                message: "Введите только число"
            }
        },
        price: {
            isRequired: {
                message: "Введите цену товара"
            },
            isDigit: {
                message: "Введите только число"
            }
        },
        rate: {
            isRequired: {
                message: "Введите рейтинг товара"
            },
            isDigit: {
                message: "Введите только число"
            }
        },
        image: {
            isRequired: {
                message: "Изображение обязательно"
            },
            isUrl: {
                message: "Неправильно введен url"
            }
        },
        category: {
            isRequired: {
                message: "Категория обязательна для заполнения"
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
            property: data.property.map((p) => p.value)
        };
        dispatch(createProduct(newData));
        setData(initialState);
    };

    return (
        <div className="card-body">
            <h2>Добавить товар</h2>
            <div className="">
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Наименование продукта"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label="Описание продукта"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        error={errors.description}
                    />
                    <TextField
                        label="Цена"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        error={errors.price}
                    />
                    <TextField
                        label="Количество на складе"
                        name="inStock"
                        value={data.inStock}
                        onChange={handleChange}
                        error={errors.inStock}
                    />
                    <TextField
                        label="Рейтинг продукта"
                        name="rate"
                        value={data.rate}
                        onChange={handleChange}
                        error={errors.rate}
                    />
                    <TextField
                        label="Вставьте ссылку на изображение"
                        name="image"
                        value={data.image}
                        onChange={handleChange}
                        error={errors.image}
                    />
                    <SelectField
                        defaultOption="Выбрать...."
                        options={transformData(categories)}
                        label="Выберите категорию"
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
                        label="Свойства товара"
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
    );
};

export default AddProductForm;
