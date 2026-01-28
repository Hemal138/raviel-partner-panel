import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SellerAllOrderDetails = () => {
  const [cancelAnchor, setCancelAnchor] = useState(null);
  const [returnAnchor, setReturnAnchor] = useState(null);
  const [movementAnchor, setMovementAnchor] = useState(null);

  return (
    <Box>
      {/* Title */}
      <Box display="flex" alignItems="center" gap={1} mb={2} sx={{ pt: "80px" }}>
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            bgcolor: "#5B5BFF",
          }}
        />
        <Typography variant="h6" fontWeight={700}>
          All Order Details
        </Typography>
      </Box>

      {/* Top Bar */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* Delivered */}
        <Typography fontWeight={600}>Delivered (50)</Typography>

        {/* CANCELED */}
        <Box
          onMouseEnter={(e) => setCancelAnchor(e.currentTarget)}
          onMouseLeave={() => setCancelAnchor(null)}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Typography fontWeight={600}>Canceled (50)</Typography>
          <KeyboardArrowDownIcon />

          <Menu
            anchorEl={cancelAnchor}
            open={Boolean(cancelAnchor)}
            onClose={() => setCancelAnchor(null)}
            MenuListProps={{
              onMouseLeave: () => setCancelAnchor(null),
            }}
          >
            <MenuItem>CUSTOMER CANCELED (10)</MenuItem>
            <MenuItem>AUTO CANCELED (20)</MenuItem>
            <MenuItem>SELLER CANCELED (30)</MenuItem>
          </Menu>
        </Box>

        {/* RETURN */}
        <Box
          onMouseEnter={(e) => setReturnAnchor(e.currentTarget)}
          onMouseLeave={() => setReturnAnchor(null)}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Typography fontWeight={600}>Return (50)</Typography>
          <KeyboardArrowDownIcon />

          <Menu
            anchorEl={returnAnchor}
            open={Boolean(returnAnchor)}
            onClose={() => setReturnAnchor(null)}
            MenuListProps={{
              onMouseLeave: () => setReturnAnchor(null),
            }}
          >
            <MenuItem>RETURNED (10)</MenuItem>
            <MenuItem>REFUNDED (20)</MenuItem>
            <MenuItem>RTO INITIATED (10)</MenuItem>
            <MenuItem>RTO IN TRANSIT (10)</MenuItem>
            <MenuItem>RTO COMPLETED (10)</MenuItem>
          </Menu>
        </Box>

        {/* 🔥 MOVEMENT */}
        <Box
          onMouseEnter={(e) => setMovementAnchor(e.currentTarget)}
          onMouseLeave={() => setMovementAnchor(null)}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Typography fontWeight={600}>Movement (50)</Typography>
          <KeyboardArrowDownIcon />

          <Menu
            anchorEl={movementAnchor}
            open={Boolean(movementAnchor)}
            onClose={() => setMovementAnchor(null)}
            MenuListProps={{
              onMouseLeave: () => setMovementAnchor(null),
            }}
          >
            <MenuItem>PLACED (10)</MenuItem>
            <MenuItem>SELLER PROCESSING (10)</MenuItem>
            <MenuItem>BAG_PACKED (10)</MenuItem>
            <MenuItem>BAG_PICKED (10)</MenuItem>
            <MenuItem>DP_ASSIGNED (10)</MenuItem>
            <MenuItem>OUT_FOR_PICKUP (10)</MenuItem>
            <MenuItem>IN TRANSIT (10)</MenuItem>
            <MenuItem>OUT FOR DELIVERY (10)</MenuItem>
            <MenuItem>DELIVERY ATTEMPTED (10)</MenuItem>
            <MenuItem>EDD_UPDATED (10)</MenuItem>
            <MenuItem>BAG_PICK_FAILED (10)</MenuItem>
          </Menu>
        </Box>
      </Paper>
    </Box>
  );
};

export default SellerAllOrderDetails;
