import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import axiosInstanceForExcel from "../AddNewSeller/axiosInstanceForExcel";
import toast from "react-hot-toast";

const UserAddExcel = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now()); // 🔥 important

  // 📂 Select Excel
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // 📥 Download Demo Excel (must be in public/)
  const handleDemoDownload = () => {
    const link = document.createElement("a");
    link.href = "/Seller-add-by-partner-format.xlsx";
    link.download = "Seller-add-by-partner-format.xlsx";
    link.click();
  };

  // 📤 Upload Excel
  const handleSubmit = async () => {
if (!file) {
  toast.error("Please select an Excel file");
  return;
}

    /**
     * 🔥 SAFETY FIX
     * Clone file to avoid ERR_UPLOAD_FILE_CHANGED
     */
    const safeFile = new File([file], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });

    const formData = new FormData();
    formData.append("add-sellers-excel-file", safeFile);

    try {
      setLoading(true);

      await axiosInstanceForExcel.post(
        "/partner/add-sellers-using-file",
        formData
      );

      toast.success("Excel uploaded successfully ✅");
      setFile(null);
      setInputKey(Date.now()); // reset file input
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload Excel ❌");
      setInputKey(Date.now()); // reset even on error
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
      {/* 🔹 Demo Excel */}
      <Button
        onClick={handleDemoDownload}
        sx={{
          mb: 2,
          px: 3,
          py: 1,
          borderRadius: 2,
          background: "#E3F2FD",
          color: "#1565C0",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { background: "#BBDEFB" },
        }}
      >
        Download Demo Excel
      </Button>

      <Typography variant="h6" mb={1} fontWeight={600}>
        Upload Seller Excel
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Download demo file, add your data & upload it
      </Typography>

      {/* 📂 Choose Excel */}
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
          key={inputKey}            // 🔥 very important
          hidden
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFileChange}
        />
      </Button>

      {file && (
        <Typography mt={2} fontSize={14} color="success.main">
          Selected: {file.name}
        </Typography>
      )}

      {/* 📤 Submit */}
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
