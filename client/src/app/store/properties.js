import { createSlice } from "@reduxjs/toolkit";
import propertyService from "../services/property.service";
import isOutdated from "../utils/isOutdated";

const propertiesSlice = createSlice({
    name: "properties",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        propertiesRequested: (state) => {
            state.isLoading = true;
        },
        propertiesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        propertiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: propertiesReducer, actions } = propertiesSlice;
const { propertiesRequested, propertiesReceived, propertiesRequestFailed } =
    actions;

export const loadPropertiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().properties;
    if (isOutdated(lastFetch)) {
        dispatch(propertiesRequested());
        try {
            const { content } = await propertyService.fetchAll();
            dispatch(propertiesReceived(content));
        } catch (error) {
            dispatch(propertiesRequestFailed(error.message));
        }
    }
};

export const getProperties = () => (state) => state.properties.entities;
export const getPropertiesLoadingStatus = () => (state) =>
    state.properties.isLoading;
export const getPropertiesByIds = (propsIds) => (state) => {
    if (state.properties.entities) {
        const propertiesArray = [];
        for (const propsId of propsIds) {
            for (const property of state.properties.entities) {
                if (property._id === propsId) {
                    propertiesArray.push(property);
                    break;
                }
            }
        }
        return propertiesArray;
    }
    return [];
};

export default propertiesReducer;
