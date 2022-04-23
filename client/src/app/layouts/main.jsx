import React from "react";

const Main = () => {
    return (
        <div className="container d-flex justify-content-center">
            <div className="card">
                <div className="card-body">
                    <h2>Было выполнено:</h2>
                    <p>Общее</p>
                    <ul>
                        <li>Поиск товара по его названию</li>
                        <li>Сотрировка товара по имени/цене/рейтингу</li>
                        <li>
                            Отдельная страница товара с описанием продукта и
                            т.п.
                        </li>
                        <li>
                            Админ панель с возможностью
                            редактирования/удаления/добавления продукта
                        </li>
                        <li>
                            Админ панель с защищенным роутом, доступ к которой
                            имеет только администратор(идентификатор админа по
                            id)
                        </li>
                        <li>Страница регистрации/входа</li>
                    </ul>
                    <p>Frontend:</p>
                    <ul>
                        <li>
                            Вывод 1 списка через GET запрос (список товаров)
                        </li>
                        <li>
                            Реализовано 4 формы отправки данных (login, signUp,
                            addProductForm, editProductForm), а также их
                            валидация
                        </li>
                        <li>
                            Сделано 5 Раутов (Main, Login, LogOut,
                            Dashboard(приватный), Products)
                        </li>
                        <li>
                            Возможность оставлять/удалять отзыв о товаре(только
                            те users, которые авторизованы на сайте)
                        </li>
                    </ul>
                    <p>Backend:</p>
                    <ul>
                        <li>Все http запросы(GET, POST, PATCH, DELETE)</li>
                        <li>
                            1 кастомный middleware для проверки авторизации, как
                            админ (для Dashboard)
                        </li>
                        <li>
                            Модели mongoose: Property, Category, Feedback,
                            Product, User, Token
                        </li>
                    </ul>
                    <p>
                        P.S. проект послужит хорошей базой для практики:
                        добавления новых фич(корзина, восстановление пароля,
                        подтверждение почты и т.п.), рефакторинг кода под новые
                        верссии(React 18), а также добавления полноценного
                        визуального составляющего(CSS, css-animation и пр) :)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
