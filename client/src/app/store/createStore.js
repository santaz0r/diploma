import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import feedbacksReducer from "./feedbacks";
import productsReducer from "./products";
import propertiesReducer from "./properties";
import usersReducer from "./users";

const rootReducer = combineReducers({
    properties: propertiesReducer,
    categories: categoriesReducer,
    products: productsReducer,
    users: usersReducer,
    feedbacks: feedbacksReducer
});
export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
