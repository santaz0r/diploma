import categories from "../mockData/categories.json";
import properties from "../mockData/properties.json";
import products from "../mockData/products.json";
import { useEffect, useState } from "react";
import httpService from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        successed: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summurtCount =
        categories.length + properties.length + products.length;
    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }
        const newProgress = Math.floor((count / summurtCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };
    useEffect(() => {
        updateProgress();
    }, [count]);
    async function initialize() {
        try {
            for (const category of categories) {
                await httpService.put("category/" + category._id, category);
                incrementCount();
            }
            for (const product of products) {
                await httpService.put("product/" + product._id, product);
                incrementCount();
            }
            for (const property of properties) {
                await httpService.put("property/" + property._id, property);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }
    return { error, initialize, progress, status };
};

export default useMockData;
