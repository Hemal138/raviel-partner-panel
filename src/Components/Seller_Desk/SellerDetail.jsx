import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const SellerDetail = ({ seller }) => {
  if (!seller) return null;

  return (
    <Box
      sx={{
        borderRadius: "20px",
        p: 3,
        bgcolor: "#fff",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Box
          sx={{
            width: 14,
            height: 14,
            bgcolor: "#FF6F61",
            borderRadius: "50%",
          }}
        />
        <Typography variant="h6" fontWeight={700}>
          Seller details
        </Typography>
      </Stack>

      {/* Details */}
      <Stack spacing={1.2}>
        <DetailRow label="Seller ID" value={seller.sellerId} />
        <DetailRow label="Seller Name" value={seller.name} />
        <DetailRow label="Seller Email" value={seller.email} />
        <DetailRow label="Launch date" value={seller.launchDate} />
      </Stack>
    </Box>
  );
};

/* 🔹 Reusable Row */
const DetailRow = ({ label, value }) => (
  <Stack direction="row" spacing={4}>
    <Typography sx={{ minWidth: 130, fontWeight: 600 }}>
      {label}:
    </Typography>
    <Typography fontWeight={600}>{value || "-"}</Typography>
  </Stack>
);

export default SellerDetail;
