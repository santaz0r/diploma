import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Products from "./layouts/products";
import Dashboard from "./layouts/dashboard";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import UsersLoader from "./components/ui/hoc/usersLoader";
import ProductsLoader from "./components/ui/hoc/productsLoader";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <>
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <ProductsLoader>
                        <ProtectedRoute
                            path="/dashboard/:productId?/:edit?"
                            component={Dashboard}
                        />
                        <UsersLoader>
                            <Route
                                path="/products/:productId?"
                                component={Products}
                            />
                        </UsersLoader>
                    </ProductsLoader>
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </>
    );
}

export default App;
