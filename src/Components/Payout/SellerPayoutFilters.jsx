import React from "react";
import { Box, TextField, Button } from "@mui/material";

const SellerPayoutFilters = ({
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
      display="flex"
      gap={2}
      mb={3}
      alignItems="center"
      flexWrap="wrap"
    >
      <TextField
        size="small"
        placeholder="Month (MM-YYYY)"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <TextField
        size="small"
        placeholder="Seller ID"
        value={sellerId}
        onChange={(e) => setSellerId(e.target.value)}
      />

      <TextField
        size="small"
        placeholder="Seller Name"
        value={sellerName}
        onChange={(e) => setSellerName(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={onApply}
        sx={{ borderRadius: "12px" }}
      >
        Apply
      </Button>
    </Box>
  );
};

export default SellerPayoutFilters;
