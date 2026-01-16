import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../../Components/Form/axiosInstance"; // path adjust karjo

const UserAddExcel = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📂 File select
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // 📤 Submit Excel
const handleSubmit = async () => {
  if (!file) {
    alert("Please select an Excel file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    setLoading(true);

    await axiosInstance.post(
      "/partner/add-sellers-using-file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Excel uploaded successfully ✅");
    setFile(null);
  } catch (error) {
    console.error(error);
    alert("Failed to upload Excel ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" mb={1} fontWeight={600} color="#071B2F">
        Upload Seller Excel
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Upload .xlsx or .xls file to add multiple sellers
      </Typography>

      <Button
        component="label"
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 2,
          background: "#F8C20A",
          fontWeight: 600,
          "&:hover": { background: "#e0ae09" },
        }}
      >
        Choose Excel
        <input
          hidden
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
        />
      </Button>

      {file && (
        <Typography mt={2} fontSize={14} color="success.main">
          Selected: {file.name}
        </Typography>
      )}

      <Box mt={3}>
        <Button
          disabled={loading}
          onClick={handleSubmit}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 2,
            background: "#635BFF",
            color: "#fff",
            fontWeight: 600,
            "&:hover": { background: "#5148e5" },
          }}
        >
          {loading ? "Uploading..." : "Submit Excel"}
        </Button>
      </Box>
    </Paper>
  );
};

export default UserAddExcel;
