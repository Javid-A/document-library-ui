import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface PublicRouteProps {
  element: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/" /> : element;
};

export default PublicRoute;
