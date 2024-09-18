import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";
import Link from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ background: "White" }}>
          <Link href="/" component="a" color="inherit">
            <Box
              component="img"
              sx={{
                height: 35,
                marginRight: 2,
              }}
              src={logo}
              alt="logo"
            />
          </Link>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#f23047", fontWeight: "bold" }}
          >
            Document Library
          </Typography>
          {user && (
            <Button
              variant="contained"
              sx={{ color: "black", background: "whitesmoke" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
