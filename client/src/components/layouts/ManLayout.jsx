import React from "react";
import { Outlet } from "react-router-dom";

const ManLayout = () => {
  return (
    <div>
      <p>ManLayout is rendering</p>

      <Outlet />
    </div>
  );
};

export default ManLayout;
