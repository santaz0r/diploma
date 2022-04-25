import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";
import history from "../utils/history";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        dataLoaded: false
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.unshift(action.payload);
        },
        productUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload;
        },
        productDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceived,
    productsRequestFailed,
    productCreated,
    productUpdateSuccessed,
    productDeleted
} = actions;
const productUpdateRequested = createAction("product/productUpdateRequested");
const productUpdateFailed = createAction("product/productUpdateFailed");
const productCreateRequested = createAction("product/productCreateRequested");
const productCreateFailed = createAction("product/productCreateFailed");
const productRemoveRequested = createAction("product/productRemoveRequested");
const productRemoveFailed = createAction("product/productRemoveFailed");

export const loadProductsList = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const { content } = await productService.get();
        dispatch(productsReceived(content));
    } catch (error) {
        dispatch(productsRequestFailed(error.message));
    }
};
export const updateProductData = (payload) => async (dispatch) => {
    dispatch(productUpdateRequested());
    try {
        const { content } = await productService.update(payload);
        dispatch(productUpdateSuccessed(content));
        history.push("/dashboard");
    } catch (error) {
        dispatch(productUpdateFailed(error.message));
    }
};

export const createProduct = (payload) => async (dispatch) => {
    dispatch(productCreateRequested());
    try {
        const { content } = await productService.create(payload);
        dispatch(productCreated(content));
        history.push("/dashboard");
    } catch (error) {
        productCreateFailed(error.message);
    }
};

export const removeProduct = (payload) => async (dispatch) => {
    dispatch(productRemoveRequested());
    try {
        const { content } = await productService.removeProduct(payload);
        if (!content) {
            dispatch(productDeleted(payload));
        }
    } catch (error) {
        dispatch(productRemoveFailed(error.message));
    }
};

export const getDataStatus = () => (state) => state.products.dataLoaded;

export const getProductsList = () => (state) => state.products.entities;
export const getProductById = (productId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((p) => p._id === productId);
    }
};
export const getProductsByIds = (productIds) => (state) => {
    if (state.products.entities) {
        const productsArray = [];
        for (const prodsId of productIds) {
            for (const product of state.products.entities) {
                if (product._id === prodsId) {
                    productsArray.push(product);
                    break;
                }
            }
        }
        return productsArray;
    }
    return [];
};
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export default productsReducer;
