import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";

const SkuDetailsCard = ({seller}) => {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        p: 4,
        maxWidth: 700,
        bgcolor: "#fff",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 1 }}
      >
        SKU Details
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Header Row */}
      <Box
        sx={{
          bgcolor: "#FFC7B3",
          borderRadius: "14px",
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={700}>Description</Typography>
        <Typography fontWeight={700}>Count</Typography>
      </Box>

      {/* Row 1 */}
      <Stack spacing={3} mt={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontSize={18}>
            SKU at launch time
          </Typography>
          <Typography fontSize={18} fontWeight={600}>
            {seller?.launchSku ?? 0}
          </Typography>
        </Box>

        <Divider />

        {/* Row 2 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontSize={18}>
            Current live SKU
          </Typography>
          <Typography fontSize={18} fontWeight={600}>
            {seller?.currentSKUsLive ?? 0}
          </Typography>
        </Box>

        <Divider />
      </Stack>
    </Box>
  );
};

export default SkuDetailsCard;
