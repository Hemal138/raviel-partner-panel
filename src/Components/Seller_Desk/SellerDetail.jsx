import React, { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import axiosInstance from "../Form/axiosInstance";

const SellerDetail = ({ seller }) => {
  
  // console.log(seller);
  

  return (
    <Box
      sx={{
        borderRadius: "20px",
        p: 3,
        bgcolor: "#fff",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Box sx={{ width: 14, height: 14, bgcolor: "#FF6F61", borderRadius: "50%" }} />
        <Typography variant="h5" fontWeight={700}>
          Seller Details
        </Typography> 
      </Stack>

      <Stack spacing={1.2}>
        <DetailRow label="Seller Code" value={seller.sellerId} />
        <DetailRow label="Name" value={seller.sellerName} />
        <DetailRow label="Launch Date" value={seller.launchingDate} />
        <DetailRow label="SKUsAtLaunch" value={seller.SKUsAtLaunch} />
        <DetailRow label="currentSKUsLive" value={seller.currentSKUsLive} />
        <DetailRow label="gstNumber" value={seller.gstNumber} />
        <DetailRow label="Phone Number" value={seller.phoneNumber} />
        <DetailRow label="sellerStatus" value={seller.sellerStatus} />
      </Stack>
    </Box>
  );
};

const DetailRow = ({ label, value }) => (
  <Stack direction="row" spacing={4}>
    <Typography sx={{ minWidth: 150, fontWeight: 600 }}>
      {label}:
    </Typography>
    <Typography fontWeight={600}>{value || "-"}</Typography>
  </Stack>
);

export default SellerDetail;
