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
    const changeClass = () => {
        return (
            "container-fluid" +
            (formOpen ? " d-flex justify-content-center" : "")
        );
    };
    const changeButtonText = () => {
        return formOpen ? "Закрыть форму" : "Открыть форму";
    };
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
        <div className={changeClass()}>
            <div className="row">
                {formOpen && (
                    <div className="card">
                        <AddProductForm />
                    </div>
                )}
            </div>
            <div className="row">
                <div className={"card"}>
                    <div className="card-body">
                        <h2>Список всех товаров</h2>
                        <p>
                            Чтобы добавить новый товар нажмите
                            <button
                                className="btn btn-primary ms-1"
                                onClick={handleClick}
                            >
                                {changeButtonText()}
                            </button>
                        </p>
                        <Table columns={columns} data={products} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTable;
