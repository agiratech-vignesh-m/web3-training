import React from "react";
import Sidebar from "./sidebar3";
import Navbar from "./navbar3";
import { Outlet } from "react-router-dom";
import "./layout3.css";
import { Card } from "@mui/material";

function Layout() {
  return (
    <div className="layout-div">
      <Sidebar />
      <div style={{ width: "100%", marginLeft: "300px" }}>
        <Navbar />
        <div style={{ padding: "40px" }}>
          {/* <Card className="main-card"> */}
          <Outlet />
          {/* </Card> */}
        </div>
      </div>
    </div>
  );
}

export default Layout;
