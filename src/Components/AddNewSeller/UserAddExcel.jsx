import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import axiosInstanceForExcel from "../AddNewSeller/axiosInstanceForExcel";
import toast from "react-hot-toast";

const UserAddExcel = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now()); // 🔥 important
  const [uploadError, setUploadError] = useState(null);

  const thStyle = {
    padding: "10px",
    textAlign: "left",
    fontWeight: 600,
    borderBottom: "1px solid #E0E0E0",
  };

  const tdStyle = {
    padding: "8px 10px",
  };

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

    const safeFile = new File([file], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });

    const formData = new FormData();
    formData.append("add-sellers-excel-file", safeFile);

    try {
      setLoading(true);

      const response = await axiosInstanceForExcel.post(
        "/partner/add-sellers-using-file",
        formData
      );

      const successMessage =
        response?.data?.message || "Excel uploaded successfully ✅";

      toast.success(successMessage);

      setFile(null);
      setInputKey(Date.now());
    } catch (error) {
      console.error("Upload error:", error);

      const errorData = error?.response?.data;

      setUploadError({
        status: errorData?.status,
        message: errorData?.message,
        success: errorData?.success,
        payload: errorData?.payload,
      });

      toast.error(errorData?.message || "Upload failed");

      setInputKey(Date.now());
    }
    finally {
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

      {uploadError && (
        <Box
          mt={3}
          p={3}
          sx={{
            borderRadius: 3,
            backgroundColor: "#FFF4F4",
            border: "1px solid #FFCDD2",
            textAlign: "left",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="error"
            mb={1}
          >
            Upload Errors
          </Typography>

          {/* <Typography fontSize={14}>
            <strong>Status:</strong> {uploadError.status}
          </Typography> */}

          <Typography fontSize={14}>
            <strong>Message:</strong> {uploadError.message}
          </Typography>

          {/* <Typography fontSize={14}>
            <strong>Success:</strong> {String(uploadError.success)}
          </Typography> */}

          {uploadError?.payload?.length > 0 && (
            <Box mt={2}>
              <Typography fontWeight={600} mb={1}>
                Error Details
              </Typography>

              <Box
                sx={{
                  maxHeight: 300,
                  overflowY: "auto",
                  borderRadius: 2,
                  border: "1px solid #E0E0E0",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#F8F9FF" }}>
                      <th style={thStyle}>#</th>
                      <th style={thStyle}>Seller ID</th>
                      <th style={thStyle}>Error Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadError.payload.map((item, index) => (
                      <tr key={index} style={{ borderTop: "1px solid #EEE" }}>
                        <td style={tdStyle}>{index + 1}</td>
                        <td style={tdStyle}>{item.sellerId}</td>
                        <td style={{ ...tdStyle, color: "#D32F2F" }}>
                          {item.errorMessage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          )}

        </Box>
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
