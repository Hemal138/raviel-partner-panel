import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const HeaderRow = ({ columns }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: columns,
      bgcolor: "#3AC76D",
      color: "#000",
      px: 2,
      py: 1,
      borderRadius: "10px",
      fontWeight: 600,
    }}
  >
    <Typography>Month</Typography>
    <Typography>Current SKU</Typography>
    <Typography>Target (SKU / Expected ₹)</Typography>
    <Typography>Earned (₹)</Typography>
  </Box>
);

const SellerDeskPayoutHistory = ({seller}) => {

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: "16px",
        p: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
        height: "100%",
      }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Payout
      </Typography>

      {/* Fixed Payout */}
      <Typography fontWeight={600} mb={1}>
        Fixed Payout History
      </Typography>

      <HeaderRow columns="1.2fr 1fr 2fr 1fr" />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 2fr 1fr",
          px: 2,
          py: 2,
        }}
      >
        <Typography>{seller?.fixedPaymentMonthYear}</Typography>
        <Typography>{seller?.currentSKUsLive ?? 50}</Typography>
        <Typography>100 / 2000</Typography>
        <Typography fontWeight={700}>₹{seller?.fixedPaymentAmount ?? 0}</Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* NMV Payout */}
      <Typography fontWeight={600} mb={1}>
        NMV Payout History
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
          bgcolor: "#3AC76D",
          px: 2,
          py: 1,
          borderRadius: "10px",
          fontWeight: 600,
        }}
      >
        <Typography>Month</Typography>
        <Typography>Total Order</Typography>
        <Typography>GMV</Typography>
        {/* <Typography>NMV</Typography> */}
        <Typography>Earned (₹)</Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
          px: 2,
          py: 2,
        }}
      >
        <Typography>{seller?.NMVPaymentMonthYear ?? "-"}</Typography>
        <Typography>{seller?.totalOrders ?? 0}</Typography>
        <Typography>{seller?.totalGMV ?? 0}</Typography>
        {/* <Typography>{seller?.NMVPaymentAmount ?? 0}</Typography> */}
        <Typography fontWeight={700}>₹{seller?.NMVPaymentAmount ?? 0}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Typography fontWeight={700}>Total:</Typography>
        <Typography fontWeight={700}>₹{seller?.totalPayout ?? 0}</Typography>
      </Box>
    </Box>
  );
};

export default SellerDeskPayoutHistory;
