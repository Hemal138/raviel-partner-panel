import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../Form/axiosInstance";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../../assets/logos/LOGO.png"
import registreimage from "../../assets/form/Untitled-2.png"
import toast from "react-hot-toast";


const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);



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

    try {
      await axiosInstance.post("/user/register", form);

      toast.success("🎉 Registered Successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error("❌ Registration failed. Please try again.");
    }

  };

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", height: "100%", padding: "10px 30px" }}>
          <Box sx={{ height: "70px" }}>
            <img src={logo} alt="" style={{ height: "100%", width: "100%" }} />
          </Box>
          <Typography
            component="a"
            href="mailto:support@raviel.in?subject=Support%20Request&body=Hello%20Support%20Team,"
            sx={{
              fontSize: "25px",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
              transition: "all 0.2s ease",

              "&:hover": {
                color: "primary.main",
                textDecoration: "underline",
              },
            }}
          >
            Help
          </Typography>


        </Box>
        {/* 🌈 PAGE BACKGROUND */}
        <Box sx={{
          background: "#ffffff",
          boxShadow: "0 20px 40px rgba(7,27,47,0.15)", width: "1000px", borderRadius: "20px", margin: "auto"
        }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ margin: "auto", }}
          >

            {/* 🧊 FORM CARD */}
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              sx={{
                width: 400,
                p: 4,
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h5"
                mb={1}
                fontWeight={700}
                color="#071B2F"
              >
                Create Account
              </Typography>

              <Typography mb={3} color="#635BFF">
                Partner Registration
              </Typography>

              {/* INPUT FIELDS */}
              {[
                { label: "First Name", name: "firstName" },
                { label: "Last Name", name: "lastName" },
                { label: "phoneNumber", name: "phoneNumber" },
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
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              ))}

              {/* PASSWORD FIELD */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#635BFF" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div style={{ margin: "12px 0" }}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  style={{ marginRight: "8px", accentColor: "#635BFF" }}
                />

                <label style={{ color: "#071B2F", fontSize: "14px" }}>
                  I accept{" "}
                  <span
                    style={{
                      color: "#635BFF",
                      cursor: "pointer",
                      fontWeight: 600,
                      textDecoration: "underline",
                    }}
                    onClick={() => setShowTerms(true)}
                  >
                    Terms & Conditions
                  </span>
                </label>
              </div>

              {showTerms && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(7,27,47,0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                  }}
                >
                  <div
                    style={{
                      background: "#ffffff",
                      width: "720px",
                      maxHeight: "80vh",
                      padding: "24px",
                      overflowY: "auto",
                      borderRadius: "12px",
                      boxShadow: "0 20px 40px rgba(7,27,47,0.25)",
                    }}
                  >
                    <h2 style={{ color: "#635BFF", marginBottom: "6px" }}>
                      Terms & Conditions
                    </h2>

                    <p style={{ fontWeight: 600, color: "#071B2F", marginBottom: "14px" }}>
                      Your Agreement
                    </p>

                    <ul style={{ color: "#071B2F", fontSize: "14px", lineHeight: "1.6" }}>
                      <li>
                        Users must provide accurate, complete, and up-to-date personal and business information during registration and onboarding.
                      </li>
                      <li>
                        Access to the platform dashboard is granted after login; however, f ull use of tools and services is enabled only after onboarding is completed and verified.
                      </li>
                      <li>
                        Until onboarding is completed, users may view the dashboard but will not be permitted to perform operational actions.
                      </li>
                      <li>
                        Users are responsible for maintaining the confidentiality of their login credentials and all activities performed under their account.
                      </li>
                      <li>
                        Business and manager contact details provided will be used strictly for platform-related communication, notifications, and operational updates.
                      </li>
                      <li>
                        Manager email and contact number are optional; however, one-click communication features will remain unavailable if these details are not provided.
                      </li>
                      <li>
                        The platform may send system notifications, transactional messages, and alerts related to account activity, settlements, or operational issues.
                      </li>
                      <li>
                        While reasonable security measures are implemented, the platform shall not be held responsible for any loss of data, delays, interruptions, or damages caused by system failures, third-party services, network issues, or events beyond reasonable control.
                      </li>
                      <li>
                        Users are encouraged to maintain independent backups of important data and records.
                      </li>
                      <li>
                        The platform shall not be liable for any indirect, incidental, or consequential losses arising from the use or inability to use the platform.
                      </li>
                      <li>
                        Users agree not to misuse the platform, attempt unauthorized access, or engage in activities that violate applicable laws or platform policies.
                      </li>
                      <li>
                        The platform reserves the right to restrict, suspend, or terminate access in cases of misuse, policy violations, or suspected fraudulent activity.
                      </li>
                      <li>
                        All financial figures, payouts, and settlements are calculated based on system-recorded data and are subject to verification and applicable deductions.
                      </li>
                      <li>
                        User data is processed and stored in accordance with the Privacy Policy and applicable data protection laws.
                      </li>
                    </ul>


                    <div style={{ textAlign: "right", marginTop: "20px" }}>
                      <button
                        onClick={() => setShowTerms(false)}
                        style={{
                          padding: "10px 22px",
                          background: "linear-gradient(135deg, #635BFF, #FF6692)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}





              {/* REGISTER BUTTON */}
              <Button
                disabled={!termsAccepted}
                fullWidth
                type="submit"
                sx={{
                  py: 1.4,
                  borderRadius: 3,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, #635BFF, #FF6692)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4B44E0, #FF4F85)",
                  },
                }}
              >
                Register
              </Button>

              {/* 🔁 LOGIN LINK */}
              <Typography
                mt={3}
                textAlign="center"
                fontSize={14}
                color="#071B2F"
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#635BFF",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
            <Box sx={{ width: "400px", paddingX: "50px" }}>
              <img src={registreimage} style={{ height: "100%", width: "100%" }} alt="" />
            </Box>

          </Box>
          <Box sx={{ padding: "20px" }}>
            <Typography component="ul" sx={{ pl: 2, color: "grey" }}>
              <Typography component="li">
                Create your account to get started with a secure and centralized business
                management platform.
              </Typography>
              <Typography component="li">
                Registration allows you to access your personal dashboard and begin setting
                up your business profile.
              </Typography>
              <Typography component="li">
                Enter basic personal and contact details to ensure account security and
                smooth communication.
              </Typography>
              <Typography component="li">
                After successful registration, you will be required to accept the Terms &
                Conditions.
              </Typography>
              <Typography component="li">
                Once registered, you can log in and view the dashboard, but tools will remain
                restricted.
              </Typography>
              <Typography component="li">
                Completing the business onboarding process is mandatory to unlock all
                platform features.
              </Typography>
            </Typography>
          </Box>

        </Box>
      </Box>

      {/* ✅ SUCCESS SNACKBAR */}

    </>
  );
};

export default Register;
