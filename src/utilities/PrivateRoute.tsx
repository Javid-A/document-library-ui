import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/material";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div></div>;
  }

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
