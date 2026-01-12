import React from "react";
import { Box, Typography } from "@mui/material";

const rows = [
  {
    id: "XZY058",
    name: "Hemal Creation",
    orders: "1,05,000",
    gmv: "₹10,05,000",
  },
  {
    id: "XKHY08",
    name: "Khushal satani",
    orders: "99,000",
    gmv: "₹99,0500",
  },
  {
    id: "KHU005",
    name: "Jayesh Bhayani",
    orders: "85,000",
    gmv: "₹70,000",
  },
  {
    id: "XZY058",
    name: "Hemal Creation",
    orders: "1,05,000",
    gmv: "₹10,05,000",
  },
  {
    id: "XZY058",
    name: "Hemal Creation",
    orders: "1,05,000",
    gmv: "₹10,05,000",
  },
];

const TopPerformer = () => {
  return (
    <Box
      sx={{
        mt: 2,
        bgcolor: "#fff",
        borderRadius: "18px",
        p: 3,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        height: "100%",
      }}
    >
      {/* Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            width: 25,
            height: 25,
            borderRadius: "50%",
            bgcolor: "#34c759",
          }}
        />
        <Typography fontSize={26} fontWeight={700}>
          Top Performer
        </Typography>
      </Box>

      {/* Header Row */}
      <Box
        sx={{
          bgcolor: "#40c76a",
          borderRadius: "10px",
          px: 2,
          py: 1.5,
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1.5fr 1.5fr",
        }}
      >
        <Typography fontWeight={700}>Seller ID</Typography>
        <Typography fontWeight={700}>Name</Typography>
        <Typography fontWeight={700}>Total Order</Typography>
        <Typography fontWeight={700}>GMV</Typography>
      </Box>

      {/* Data Rows */}
      {rows.map((row, index) => (
        <Box
          key={index}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1.5fr 1.5fr",
            px: 2,
            py: 2,
            borderBottom: "1px solid #cfcfcfff",
            alignItems: "center",
          }}
        >
          <Typography fontSize={16}>{row.id}</Typography>
          <Typography fontSize={16}>{row.name}</Typography>
          <Typography fontSize={16}>{row.orders}</Typography>
          <Typography fontSize={16}>{row.gmv}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TopPerformer;
