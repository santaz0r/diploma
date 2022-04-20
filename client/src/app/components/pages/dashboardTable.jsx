import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AddProductForm from "../ui/addProductForm";
import { getProductsList, removeProduct } from "../../store/products";
import Table from "../common/table";
import Category from "../ui/category";

const DashboardTable = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProductsList());
    const history = useHistory();
    const [formOpen, setFormOpen] = useState(false);

    const onClick = (id) => {
        history.push(location.pathname + `/${id}/edit`);
    };
    const handleDelete = (id) => {
        dispatch(removeProduct(id));
    };
    const columns = {
        name: {
            path: "name",
            name: "Наименование"
        },
        category: {
            name: "Категория",
            component: (product) => <Category id={product.category} />
        },
        price: {
            path: "price",
            name: "Цена"
        },
        inStock: {
            path: "inStock",
            name: "Количество"
        },
        image: {
            path: "image",
            name: "Изображение",
            component: (product) => (
                <img
                    src={product.image}
                    alt="image"
                    style={{ height: "50px" }}
                />
            )
        },
        actions: {
            name: "Действия",
            component: (product) => (
                <div className="d-flex justify-content-around">
                    <i
                        onClick={() => onClick(product._id)}
                        role={"button"}
                        className="bi bi-pencil-fill"
                    ></i>
                    <i
                        onClick={() => handleDelete(product._id)}
                        role={"button"}
                        className="bi bi-x-circle-fill text-danger"
                    ></i>
                </div>
            )
        }
    };
    const handleClick = () => {
        setFormOpen((prev) => !prev);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {formOpen && (
                    <div className="col-md-3  p-1">
                        <h2>Добавить товар</h2>

                        <AddProductForm />
                    </div>
                )}

                <div className="col-md-8">
                    <h2>Список всех товаров</h2>
                    <p>
                        Чтобы добавить новый товар нажмите
                        <button
                            className="btn btn-primary large"
                            onClick={handleClick}
                        >
                            Добавить
                        </button>
                    </p>

                    <Table columns={columns} data={products} />
                </div>
            </div>
        </div>
    );
};

export default DashboardTable;
