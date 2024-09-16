import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"; // Import the Header component

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
