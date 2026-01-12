import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axiosInstance from "./axiosInstance";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Error state
  const [errorMsg, setErrorMsg] = useState("");
  const [openError, setOpenError] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      const token = res.data.payload.accessToken;

      // ✅ Save token
      sessionStorage.setItem("token", token);

      navigate("/home");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Invalid email or password"
      );
      setOpenError(true);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={6}>
      <Typography variant="h5" mb={2} fontWeight={600}>
        Login
      </Typography>

      <TextField
        fullWidth
        label="Email"
        autoComplete="username"
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        sx={{ mt: 2 }}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleLogin}
      >
        Login
      </Button>

      {/* ================= Error Snackbar ================= */}
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            fontWeight: 500,
          }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
