import React, { useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../../store/users";
import { Link } from "react-router-dom";

const AddFeedbackForm = ({ onSubmit }) => {
    const currentUserId = useSelector(getCurrentUserId());
    const currentUser = useSelector(getUserById(currentUserId));
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    if (!currentUser) {
        return (
            <div>
                <h2>Войдите в систему, чтобы оставить отзыв</h2>

                <Link to="/login">
                    <button className="btn btn-primary w-100">Войти</button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h2>New Feedback</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    value={data.content || ""}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};
AddFeedbackForm.propTypes = {
    onSubmit: PropTypes.func
};
export default AddFeedbackForm;
