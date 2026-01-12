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

/* 🔹 Return Tables Data (KEY BASED – ALL CAPS) */
const RETURN_TABLE_DATA = {
  RETURNED: [
    {
      id: 1,
      date: "14-12-2025",
      shipmentId: "RET123456",
      orderId: "ORD789456",
      sellerId: "SEL001",
      name: "Hemal Creation",
      value: "₹25,000",
    },
  ],

  REFUNDED: [
    {
      id: 2,
      date: "15-12-2025",
      shipmentId: "REF654321",
      orderId: "ORD456123",
      sellerId: "SEL002",
      name: "Khushal Satani",
      value: "₹40,000",
    },
  ],

  RTO_INITIATED: [
    {
      id: 3,
      date: "16-12-2025",
      shipmentId: "RTO111222",
      orderId: "ORD998877",
      sellerId: "SEL003",
      name: "Jayesh Bhayani",
      value: "₹18,500",
    },
  ],

  RTO_IN_TRANSIT: [
    {
      id: 4,
      date: "17-12-2025",
      shipmentId: "RTO333444",
      orderId: "ORD665544",
      sellerId: "SEL004",
      name: "Aakash Store",
      value: "₹32,000",
    },
  ],

  RTO_COMPLETED: [
    {
      id: 5,
      date: "18-12-2025",
      shipmentId: "RTO777888",
      orderId: "ORD112233",
      sellerId: "SEL005",
      name: "Fashion Hub",
      value: "₹55,000",
    },
  ],
};

const Return = ({ activeSub }) => {
  if (!activeSub) return null;

  // 🔹 normalize key (SAFE)
  const key = activeSub
  .toUpperCase()
  .replace(/\s+/g, "_");

const rows = RETURN_TABLE_DATA[key] || [];


  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        🔵 All time return order details
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: "14px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#5C9DFF" }}>
              <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                Shipment ID
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                Order ID
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                Seller ID
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                Order Value (₹)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.shipmentId}</TableCell>
                  <TableCell>{row.orderId}</TableCell>
                  <TableCell>{row.sellerId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Return;
