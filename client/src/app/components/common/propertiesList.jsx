import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Property from "./property";
import { useDispatch, useSelector } from "react-redux";
import {
    getPropertiesByIds,
    getPropertiesLoadingStatus,
    loadPropertiesList
} from "../../store/properties";

const PropetiesList = ({ properties }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getPropertiesLoadingStatus());
    const propertiesList = useSelector(getPropertiesByIds(properties));
    useEffect(() => {
        dispatch(loadPropertiesList());
    }, []);

    if (isLoading) return "Loading props";
    return (
        <>
            {propertiesList.map((p) => (
                <Property key={p._id} {...p} />
            ))}
        </>
    );
};
PropetiesList.propTypes = {
    properties: PropTypes.array
};
export default PropetiesList;
