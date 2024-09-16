import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/login";
import PrivateRoute from "./utilities/PrivateRoute";
import Profile from "./pages/profile";
import Layout from "./components/Layout";
import Registration from "./pages/registration";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<Registration />} />

          <Route element={<PrivateRoute element={<Layout />} />}>
            <Route path="/" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
