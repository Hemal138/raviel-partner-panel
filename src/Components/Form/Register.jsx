import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    role: "partner",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axiosInstance.post(
        "/user/register",
        form
      );

      // ✅ show success box
      setSuccess(true);

      // ✅ move to login after 2 sec
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <>
      <Box
        component="form"
        maxWidth={400}
        mx="auto"
        mt={6}
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <Typography variant="h5" mb={2}>
          Register
        </Typography>

        <TextField fullWidth label="First Name" name="firstName" onChange={handleChange} />
        <TextField fullWidth label="Last Name" name="lastName" onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Mobile" name="mobile" onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Email" name="email" onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} sx={{ mt: 2 }} />

        <TextField
          fullWidth
          select
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          sx={{ mt: 2 }}
        >
          <MenuItem value="partner">Partner</MenuItem>
        </TextField>

        <Button fullWidth variant="contained" sx={{ mt: 3 }} type="submit">
          Register
        </Button>
      </Box>

      {/* ✅ SUCCESS MESSAGE BOX */}
      <Snackbar open={success} autoHideDuration={2000}>
        <Alert severity="success" variant="filled" sx={{ fontSize: 16 }}>
          🎉 You are registered successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
