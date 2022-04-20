import React from "react";
import { useParams } from "react-router-dom";
import DashboardTable from "../components/pages/dashboardTable";
import EditProductPage from "../components/pages/editProductPage";

const Dashboard = () => {
    const { productId, edit } = useParams();
    return (
        <>
            {edit ? <EditProductPage itemId={productId} /> : <DashboardTable />}
        </>
    );
};

export default Dashboard;
