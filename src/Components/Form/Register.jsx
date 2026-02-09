import {
  Box,
  TextField,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../Form/axiosInstance";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import logo from "../../assets/logos/LOGO.png";
import registreimage from "../../assets/form/Untitled-2.png";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "partner",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";

    if (!/^[0-9]{10}$/.test(form.phoneNumber))
      newErrors.phoneNumber = "Enter valid 10 digit number";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter valid email";

    if (form.password.length < 6)
      newErrors.password = "Min 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    if (loading) return;

    setLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      await axiosInstance.post("/user/register", form);

      toast.success("🎉 Registered Successfully!", { id: toastId });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        (Array.isArray(err?.response?.data?.errors)
          ? err.response.data.errors[0]
          : null) ??
        "❌ Registration failed. Please try again.";

      toast.error(apiMessage, { id: toastId });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔝 HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", p: "10px 30px" }}>
        <Box sx={{ height: 70 }}>
          <img src={logo} alt="logo" style={{ height: "100%" }} />
        </Box>
        <Typography
          component="a"
          href="mailto:support@raviel.in"
          sx={{ fontSize: 22, fontWeight: 600, cursor: "pointer" }}
        >
          Help
        </Typography>
      </Box>

      {/* 🧊 MAIN CARD */}
      <Box
        sx={{
          background: "#fff",
          width: 1000,
          borderRadius: 3,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          margin: "auto",
        }}
      >
        <Box display="flex" justifyContent="center">
          {/* FORM */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            sx={{ width: 400, p: 4 }}
          >
            <Typography variant="h5" fontWeight={700} mb={1}>
              Create Account
            </Typography>

            <Typography mb={3} color="#635BFF">
              Partner Registration
            </Typography>

            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Phone Number", name: "phoneNumber" },
              { label: "Email", name: "email" },
            ].map((field) => (
              <TextField
                key={field.name}
                fullWidth
                label={field.label}
                name={field.name}
                onChange={handleChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
                sx={{ mb: 2 }}
              />
            ))}

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div style={{ marginBottom: 12 }}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />{" "}
              I accept{" "}
              <span
                style={{ color: "#635BFF", cursor: "pointer" }}
                onClick={() => setShowTerms(true)}
              >
                Terms & Conditions
              </span>
            </div>

            <Button
              disabled={!termsAccepted || loading}
              fullWidth
              type="submit"
              sx={{
                py: 1.4,
                color: "#fff",
                background:
                  "linear-gradient(135deg, #635BFF, #FF6692)",
              }}
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>

            <Typography mt={3} textAlign="center" fontSize={14}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#635BFF" }}>
                Login
              </Link>
            </Typography>
          </Box>

          {/* IMAGE */}
          <Box sx={{ width: 400, p: 4 }}>
            <img src={registreimage} alt="" style={{ width: "100%" }} />
          </Box>
        </Box>
      </Box>

      {/* 🔄 FULL SCREEN LOADER */}
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Register;
