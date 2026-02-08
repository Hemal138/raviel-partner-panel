import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Autocomplete } from "@mui/material";

const monthOptions = ["08-2025", "09-2025", "12-2025"];

const SearchFilters = ({ onApply }) => {
  /* 🔹 SINGLE STATE FOR ALL FILTERS */
  const [filters, setFilters] = useState({
    month: "",
    sellerId: "",
    sellerName: "",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApply = () => {
    // console.log("Filters entered by user:", filters); // ✅ stored in one variable
    onApply?.(filters); // parent ne mokli sakay (optional)
  };

  return (
    <Box
      sx={{
        p: 3,
        mb: 3,
        borderRadius: "18px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,247,255,0.9))",
        backdropFilter: "blur(10px)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
      }}
    >
      <Grid container spacing={3} alignItems="flex-end">
        {/* MONTH */}
        <Grid item xs={12} md={5}>
          <Typography fontSize={13} fontWeight={600} mb={0.8}>
            Month
          </Typography>

          <Autocomplete
            sx={{ width: "200px" }}
            freeSolo
            options={monthOptions}
            value={filters.month}
            onChange={(e, val) => handleChange("month", val || "")}
            onInputChange={(e, val) => handleChange("month", val)}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Select / Type Month"
                sx={inputStyle}
              />
            )}
          />
        </Grid>

        {/* SELLER ID */}
        <Grid item xs={12} md={3}>
          <Typography fontSize={13} fontWeight={600} mb={0.8}>
            Seller ID
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={filters.sellerId}
            onChange={(e) => handleChange("sellerId", e.target.value)}
            placeholder="Enter seller ID"
            sx={inputStyle}
          />
        </Grid>

        {/* SELLER NAME */}
        <Grid item xs={12} md={3}>
          <Typography fontSize={13} fontWeight={600} mb={0.8}>
            Seller Name
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={filters.sellerName}
            onChange={(e) => handleChange("sellerName", e.target.value)}
            placeholder="Enter seller name"
            sx={inputStyle}
          />
        </Grid>

        {/* APPLY */}
        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            onClick={handleApply}
            sx={{
              borderRadius: "14px",
              fontWeight: 700,
              fontSize: "15px",
              textTransform: "none",
              color: "#fff",
              padding: "10px 30px",
              background: "#635BFF",
              boxShadow: "0 10px 24px rgba(91,140,255,0.45)",
              "&:hover": { bgcolor: "black" },
            }}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

/* 🔹 Shared Input Style */
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    height: "46px",
    borderRadius: "14px",
    backgroundColor: "#fff",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
    "& fieldset": {
      border: "1px solid #e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#c7d2fe",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5b8cff",
      borderWidth: "2px",
    },
  },
};

export default SearchFilters;
