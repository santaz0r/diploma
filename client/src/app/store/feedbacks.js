import { createAction, createSlice } from "@reduxjs/toolkit";
import feedbackService from "../services/feedback.service";

const feedbacksSlice = createSlice({
    name: "feedbacks",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        feedbacksRequested: (state) => {
            state.isLoading = true;
        },
        feedbacksReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        feedbacksRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        feedbackCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        feedbackRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (feedback) => feedback._id !== action.payload
            );
        }
    }
});
const { reducer: feedbacksReducer, actions } = feedbacksSlice;
const {
    feedbacksRequested,
    feedbacksReceived,
    feedbacksRequestFailed,
    feedbackCreated,
    feedbackRemoved
} = actions;

const addFeedbackRequested = createAction("feedbacks/addFeedbackRequested");
const removeFeedbackRequested = createAction(
    "feedbacks/removeFeedbackRequested"
);

export const loadFeedbacksList = (productId) => async (dispatch) => {
    dispatch(feedbacksRequested());
    try {
        const { content } = await feedbackService.getFeedbacks(productId);
        dispatch(feedbacksReceived(content));
    } catch (error) {
        dispatch(feedbacksRequestFailed(error.message));
    }
};

export const createFeedback = (payload) => async (dispatch, getState) => {
    dispatch(addFeedbackRequested(payload));
    try {
        const { content } = await feedbackService.createFeedback(payload);
        dispatch(feedbackCreated(content));
    } catch (error) {
        dispatch(feedbacksRequestFailed(error.message));
    }
};
export const removeFeedback = (feedbackId) => async (dispatch) => {
    dispatch(removeFeedbackRequested());
    try {
        const { content } = await feedbackService.removeFeedback(feedbackId);
        if (!content) {
            dispatch(feedbackRemoved(feedbackId));
        }
    } catch (error) {
        dispatch(feedbacksRequestFailed(error.message));
    }
};
export const getFeedbacks = () => (state) => state.feedbacks.entities;
export const getFeedbacksLoadingStatus = () => (state) =>
    state.feedbacks.isLoading;

export default feedbacksReducer;
