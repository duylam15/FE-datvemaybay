import React from 'react';
import { Outlet } from "react-router-dom";

const Ve = () => {
    return (
        <div className="may-bay-page">
            <Outlet></Outlet>
        </div>
    );
};

export default Ve;