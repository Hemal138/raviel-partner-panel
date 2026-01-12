import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";

const TABLE_DATA = {
  "Customer canceled": [
    {
      id: 1,
      date: "12-12-2025",
      shipmentId: "17655219643821301052J",
      orderId: "17655219643821301052J",
      sellerId: "XZY058",
      name: "Hemal Creation",
      value: "₹10,05,000",
    },
    {
      id: 2,
      date: "12-12-2025",
      shipmentId: "17655219643821301052J",
      orderId: "17655219643821301052J",
      sellerId: "XKHY08",
      name: "Khushal Satani",
      value: "₹99,05,000",
    },
  ],

  "Auto canceled": [
    {
      id: 3,
      date: "12-12-2025",
      shipmentId: "17655219643821301052J",
      orderId: "17655219643821301052J",
      sellerId: "KHU005",
      name: "Jayesh Bhayani",
      value: "₹70,000",
    },
  ],

  "Seller canceled": [
    {
      id: 4,
      date: "12-12-2025",
      shipmentId: "17655219643821301052J",
      orderId: "17655219643821301052J",
      sellerId: "XZY058",
      name: "Hemal Creation",
      value: "₹10,05,000",
    },
  ],
};

const Canceled = ({ activeSub }) => {
  if (!activeSub || !TABLE_DATA[activeSub]) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        🔴 All time {activeSub} order details
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: "14px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#FF5C8A" }}>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Shipment ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Seller ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Order Value (₹)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {TABLE_DATA[activeSub].map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.shipmentId}</TableCell>
                <TableCell>{row.orderId}</TableCell>
                <TableCell>{row.sellerId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Canceled;
