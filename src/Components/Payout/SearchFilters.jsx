import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { Autocomplete } from "@mui/material";

const monthOptions = ["08-2025", "09-2025", "10-2025"];

const SearchFilters = ({
  month,
  setMonth,
  sellerId,
  setSellerId,
  sellerName,
  setSellerName,
  onApply,
}) => {
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
        {/* Month */}
        <Grid item xs={12} md={5}>
          <Typography fontSize={13} fontWeight={600} mb={0.8}>
            Month
          </Typography>

          <Autocomplete
            sx={{ width: "200px" }}
            freeSolo // ✅ user can type manually
            options={monthOptions} // ✅ suggestions
            value={month}
            onChange={(e, newValue) => setMonth(newValue || "")}
            onInputChange={(e, newInputValue) => setMonth(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Select/Type Month"
                sx={inputStyle}
              />
            )}
          />
        </Grid>

        {/* Seller ID */}
        <Grid item xs={12} md={3}>
          <Typography fontSize={13} fontWeight={600} mb={0.8}>
            Seller ID
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={sellerId}
            onChange={(e) => setSellerId(e.target.value)}
            placeholder="Enter seller ID"
            sx={inputStyle}
          />
        </Grid>

        {/* Seller Name */}
        <Grid item xs={12} md={3}>
          <Typography fontSize={13} fontWeight={600} mb={0.8}>
            Seller Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            placeholder="Enter seller name"
            sx={inputStyle}
          />
        </Grid>

        {/* Apply */}
        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            onClick={onApply}
            sx={{
              //   height: "46px",
              borderRadius: "14px",
              fontWeight: 700,
              fontSize: "15px",
              textTransform: "none",
              color: "#fff",
              padding: "10px 30px",
              background: "#635BFF",
              boxShadow: "0 10px 24px rgba(91,140,255,0.45)",
              "&:hover": {
                bgcolor: "black",
              },
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
