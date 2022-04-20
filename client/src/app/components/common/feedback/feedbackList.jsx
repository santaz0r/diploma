import React from "react";
import Feedback from "./feedback";
import PropTypes from "prop-types";

const FeedbackList = ({ feedback, onRemove }) => {
    return feedback.map((f) => (
        <Feedback key={f._id} {...f} onRemove={onRemove} />
    ));
};
FeedbackList.propTypes = {
    feedback: PropTypes.array,
    onRemove: PropTypes.func
};
export default FeedbackList;
