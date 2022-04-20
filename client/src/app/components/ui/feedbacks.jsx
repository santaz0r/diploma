import React, { useEffect } from "react";
import { orderBy } from "lodash";
import FeedbackList from "../common/feedback/feedbackList";
import AddFeedbackForm from "../common/feedback/addFeedbackForm";
import { useDispatch, useSelector } from "react-redux";
import {
    createFeedback,
    getFeedbacks,
    getFeedbacksLoadingStatus,
    loadFeedbacksList,
    removeFeedback
} from "../../store/feedbacks";
import { useParams } from "react-router-dom";

const Feedbacks = () => {
    const { productId } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadFeedbacksList(productId));
    }, [productId]);
    const isLoading = useSelector(getFeedbacksLoadingStatus());
    const feedbacks = useSelector(getFeedbacks());

    const handleSubmit = (data) => {
        dispatch(createFeedback({ ...data, pageId: productId }));
    };
    const handleRemoveFeedback = (id) => {
        dispatch(removeFeedback(id));
    };
    const sortedFeedback = orderBy(feedbacks, ["created_at"], ["desc"]);
    return (
        <>
            {sortedFeedback.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Feedbacks</h2>
                        <hr />
                        {!isLoading ? (
                            <FeedbackList
                                feedback={sortedFeedback}
                                onRemove={handleRemoveFeedback}
                            />
                        ) : (
                            "Loading comments"
                        )}
                    </div>
                </div>
            )}
            <div className="card mb-2">
                <div className="card-body">
                    <AddFeedbackForm onSubmit={handleSubmit} />
                </div>
            </div>
        </>
    );
};

export default Feedbacks;
