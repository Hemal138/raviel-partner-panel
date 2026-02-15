import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import axiosInstanceForExcel from "../AddNewSeller/axiosInstanceForExcel";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    // borderRadius: "50px",
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
    overflow: "hidden",

    "& fieldset": {
      // borderRadius: "50px",
      borderColor: "#DADAFF",
    },

    "&:hover fieldset": {
      borderColor: "#635BFF",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#635BFF",
      borderWidth: "2px",
    },
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#635BFF",
  },
};

const PaymentType = () => {
  const [reportType, setReportType] = useState("");
  const [paymentByMonthYear, setPaymentByMonthYear] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [loading, setLoading] = useState(false);

  const formatDateForAPI = (monthValue) => {
    if (!monthValue) return undefined;
    return `${monthValue}-01`;
  };

  const handleDownload = async (fileType) => {
  if (!reportType) {
    toast.error("Please select Report Type");
    return;
  }

  if (reportType === "payoutReport" && !paymentType) {
    toast.error("Please select Payment Type");
    return;
  }

  try {
    setLoading(true);

    const formattedDate =
      reportType === "payoutReport"
        ? formatDateForAPI(paymentByMonthYear)
        : undefined;

    const response = await axiosInstanceForExcel.get(
      "/partner/download-seller-payout-or-growth-report",
      {
        params: {
          reportType,
          paymentByMonthYear: formattedDate,
          paymentType:
            reportType === "payoutReport" ? paymentType : undefined,
          fileType,
        },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const extension =
      fileType.toUpperCase() === "PDF" ? "pdf" : "xlsx";

    link.setAttribute(
      "download",
      `${reportType}-report.${extension}`
    );

    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success("Download successful");
} catch (error) {
  console.error("Download failed:", error);

  if (error.response?.data instanceof Blob) {
    const text = await error.response.data.text();
    try {
      const json = JSON.parse(text);
      toast.error(json.message || "Something went wrong");
    } catch {
      toast.error("Something went wrong");
    }
  } else {
    const apiMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Something went wrong";

    toast.error(apiMessage);
  }
}
finally {
    setLoading(false);
  }
};


  return (
    <Box
      sx={{
        maxWidth: 520,
        mx: "auto",
        p: 4,
        mt: 5,
        borderRadius: 4,
        boxShadow: "0px 15px 40px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Seller Report Download
      </Typography>

      {/* Report Type */}
      <TextField
        select
        fullWidth
        label="Report Type"
        value={reportType}
        onChange={(e) => {
          setReportType(e.target.value);
          setPaymentType("");
          setPaymentByMonthYear("");
        }}
        sx={inputStyle}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                borderRadius: 3,
                mt: 1,
                boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
              },
            },
          },
        }}
      >
        {["payoutReport", "sellerGrowth"].map((item) => (
          <MenuItem
            key={item}
            value={item}
            sx={{
              py: 1.5,
              mx: 1,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#DADAFF",
              },
            }}
          >
            {item === "payoutReport"
              ? "Payout Report"
              : "Seller Growth"}
          </MenuItem>
        ))}
      </TextField>

      {/* Month Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={["year", "month"]}
          label="Select Month & Year (Optional)"
          value={paymentByMonthYear ? dayjs(paymentByMonthYear) : null}
          onChange={(newValue) => {
            if (newValue) {
              setPaymentByMonthYear(newValue.format("YYYY-MM"));
            } else {
              setPaymentByMonthYear("");
            }
          }}
          disabled={reportType !== "payoutReport"}
          slotProps={{
            textField: {
              fullWidth: true,
              sx: inputStyle,
            },
            popper: {
              sx: {
                "& .MuiPaper-root": {
                  borderRadius: 4,
                  boxShadow:
                    "0px 20px 60px rgba(0,0,0,0.15)",
                },
              },
            },
          }}
        />
      </LocalizationProvider>

      {/* Payment Type */}
      <TextField
        select
        fullWidth
        label="Payment Type"
        value={paymentType}
        onChange={(e) => setPaymentType(e.target.value)}
        disabled={reportType !== "payoutReport"}
        sx={inputStyle}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                borderRadius: 3,
                mt: 1,
                boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
              },
            },
          },
        }}
      >
        {["Fixed", "NMV", "all"].map((item) => (
          <MenuItem
            key={item}
            value={item}
            sx={{
              py: 1.5,
              mx: 1,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#DADAFF",
              },
            }}
          >
            {item}
          </MenuItem>
        ))}
      </TextField>

      {/* Download Icons */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 2,
        }}
      >
        <Box
          onClick={() => !loading && handleDownload("PDF")}
          sx={{
            flex: 1,
            cursor: "pointer",
            textAlign: "center",
            p: 3,
            borderRadius: 4,
            backgroundColor: "#FFCCDB",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "#FF6692",
              color: "#fff",
            },
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <PictureAsPdfIcon sx={{ fontSize: 70 }} />
          )}
          <Typography mt={1} fontWeight="bold">
            PDF
          </Typography>
        </Box>

        <Box
          onClick={() => !loading && handleDownload("Excel")}
          sx={{
            flex: 1,
            cursor: "pointer",
            textAlign: "center",
            p: 3,
            borderRadius: 4,
            backgroundColor: "#DEFFEB",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "#36C76C",
              color: "#fff",
            },
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <TableChartIcon sx={{ fontSize: 70 }} />
          )}
          <Typography mt={1} fontWeight="bold">
            Excel
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentType;
