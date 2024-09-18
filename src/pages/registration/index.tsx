import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../Appconfig";
import { useNavigate } from "react-router-dom";

interface RegisterFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    // Basic validation
    if (!username) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
    }
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
    }

    if (username && email && password && password === confirmPassword) {
      try {
        const data: RegisterFormData = {
          userName: username,
          email,
          password,
          confirmPassword,
        };
        const response = await axios.post(
          `${BASE_URL}/api/accounts/register`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.data.succeeded) {
          navigate("/login");
        }
      } catch (error) {
        console.error("There was an error registering the user!", error);
      }
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: "12px",
          width: "100%",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ textAlign: "center" }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
            Register
          </Typography>

          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "10px",
            }}
          >
            Register
          </Button>
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 2,
              textAlign: "center",
              cursor: "pointer",
              "&:hover": {
                color: "blue",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Login here
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Registration;
