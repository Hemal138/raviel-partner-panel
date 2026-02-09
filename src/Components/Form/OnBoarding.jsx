import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import axiosInstance from "../Form/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";



const OnBoarding = () => {

const [formData, setFormData] = useState({
  businessName: "",
  gstNumber: "",
  gstAddress: "",
  managerEmail: "",
  managerPhoneNumber: "",
  role:"partner"
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


const { refetchUser } = useUser();
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await axiosInstance.post("/user-business-details", formData);

    toast.success("Onboarding completed");

    // 🔄 REFRESH USER DATA (WITHOUT PAGE REFRESH)
    await refetchUser();

    // 🚀 DIRECT DASHBOARD
    navigate("/", { replace: true });
  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={18}
        sx={{
          width: "100%",
          maxWidth: 460,
          p: 4,
          borderRadius: "22px",
          bgcolor: "#ffffff",
        }}
      >
        {/* Center Title */}
        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          mb={3}
          sx={{ color: "#635BFF" }}
        >
          Onboarding
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            sx={inputStyle}
          />

          <TextField
            fullWidth
            label="GST Number"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            required
            sx={inputStyle}
          />

          <TextField
            fullWidth
            label="GST Address"
            name="gstAddress"
            value={formData.gstAddress}
            onChange={handleChange}
            required
            multiline
            rows={3}
            sx={inputStyle}
          />

          <TextField
            fullWidth
            label="Manager Email"
            name="managerEmail"
            type="email"
            value={formData.managerEmail}
            onChange={handleChange}
            required
            sx={inputStyle}
          />

          <TextField
            fullWidth
            label="Manager Number"
            name="managerPhoneNumber"
            type="tel"
            value={formData.managerPhoneNumber}
            onChange={handleChange}
            required
            sx={inputStyle}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.6,
              borderRadius: "16px",
              fontWeight: 700,
              fontSize: "16px",
              bgcolor: "#3968eb",
              color: "#071B2F",
              "&:hover": {
                bgcolor: "#1e56ed",
              },
            }}
          >
            {loading ? "Submitting..." : "Submit Onboarding"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OnBoarding;

/* Shared input style */
const inputStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "#FFFFFF",
  },
  "& label.Mui-focused": {
    color: "#635BFF",
  },
  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    borderColor: "#635BFF",
  },
};
