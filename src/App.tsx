import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/login";
import PrivateRoute from "./utilities/PrivateRoute";
import Profile from "./pages/profile";
import Layout from "./components/Layout";
import Registration from "./pages/registration";
import SharedFile from "./pages/SharedFile";
import PublicRoute from "./utilities/PublicRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/login"
              element={<PublicRoute element={<LoginPage />} />}
            />
            <Route path="/get-shared-file" element={<SharedFile />} />
            <Route
              path="/registration"
              element={<PublicRoute element={<Registration />} />}
            />
            <Route path="/" element={<PrivateRoute element={<Profile />} />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
