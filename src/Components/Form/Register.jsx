import {
  Box,
  TextField,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../Form/axiosInstance";
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
        "❌ Registration failed. Please try again.";

      toast.error(apiMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7ff, #ffffff)",
        py: 4,
        px: 2,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1100,
          mx: "auto",
          mb: 3,
        }}
      >
        <Box sx={{ height: 60 }}>
          <img src={logo} alt="logo" style={{ height: "100%" }} />
        </Box>

        <Typography
          component="a"
          href="mailto:support@raviel.in"
          sx={{
            fontSize: { xs: 16, sm: 18 },
            fontWeight: 600,
            textDecoration: "none",
            color: "#000",
          }}
        >
          Help
        </Typography>
      </Box>

      {/* MAIN CARD */}
      <Box
        sx={{
          background: "#fff",
          width: "100%",
          maxWidth: 1000,
          borderRadius: 3,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          mx: "auto",
        }}
      >
        {/* FORM + IMAGE */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* FORM SECTION */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            sx={{
              flex: 1,
              p: { xs: 3, md: 5 },
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Create Account
            </Typography>

            <Typography mb={3} color="#3968eb">
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

            {/* TERMS */}
            <Box sx={{ mb: 2 }}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />{" "}
              I accept{" "}
              <span
                style={{ color: "#3968eb", cursor: "pointer" }}
                onClick={() => setShowTerms(true)}
              >
                Terms & Conditions
              </span>
            </Box>

            <Button
              disabled={!termsAccepted || loading}
              fullWidth
              type="submit"
              sx={{
                py: 1.4,
                color: "#fff",
                bgcolor: "#3968eb",
                "&:hover": { bgcolor: "#2f57c8" },
              }}
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>

            <Typography mt={3} textAlign="center" fontSize={14}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#3968eb" }}>
                Login
              </Link>
            </Typography>
          </Box>

          {/* IMAGE SECTION */}
<Box
  sx={{
    flex: 1,
    p: 5,
    display: { xs: "none", md: "flex" }, // 🔥 hide on mobile + tablet
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <img
    src={registreimage}
    alt="register"
    style={{
      width: "100%",
      maxWidth: 350,
    }}
  />
</Box>

        </Box>

        {/* INSTRUCTIONS */}
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Typography fontWeight={700} mb={2} color="#3968eb">
            Registration Instructions
          </Typography>

          <Box
            component="ul"
            sx={{
              pl: 3,
              m: 0,
              lineHeight: 1.8,
              fontSize: { xs: 14, sm: 15, md: 16 },
              color: "#4A4A4A",
            }}
          >
            <li>Create your account to access the secure business platform.</li>
            <li>Registration unlocks your personal dashboard.</li>
            <li>Enter accurate details for smooth communication.</li>
            <li>Accept Terms & Conditions to continue.</li>
            <li>Dashboard access is limited until onboarding completes.</li>
            <li>Complete onboarding to unlock all features.</li>
          </Box>
        </Box>
      </Box>

      {/* LOADER */}
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* TERMS MODAL */}
      <Dialog
        open={showTerms}
        onClose={() => setShowTerms(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Terms and Conditions
        </DialogTitle>

        <DialogContent dividers sx={{ maxHeight: "60vh" }}>
          <Typography fontWeight={600} mb={1}>
            Your Agreement
          </Typography>

          <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Users must provide accurate information.</li>
            <li>Dashboard access is granted after login.</li>
            <li>Operational tools unlock after onboarding.</li>
            <li>Users are responsible for account security.</li>
            <li>Platform may send notifications and alerts.</li>
            <li>Misuse may result in suspension.</li>
            <li>Financial data is system-calculated and verified.</li>
          </ul>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowTerms(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Register;
