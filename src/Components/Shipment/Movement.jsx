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

/* 🔹 Movement table data (label based) */
const MOVEMENT_TABLE_DATA = {
  "Return initiated": [
    {
      id: 1,
      date: "14-12-2025",
      shipmentId: "RET10001",
      orderId: "ORD90001",
      sellerId: "SEL001",
      name: "Hemal Creation",
      value: "₹25,000",
    },
  ],

  "Pickup scheduled": [
    {
      id: 2,
      date: "15-12-2025",
      shipmentId: "RET10002",
      orderId: "ORD90002",
      sellerId: "SEL002",
      name: "Khushal Satani",
      value: "₹40,000",
    },
  ],

  "Pickup attempted": [
    {
      id: 3,
      date: "16-12-2025",
      shipmentId: "RET10003",
      orderId: "ORD90003",
      sellerId: "SEL003",
      name: "Jayesh Bhayani",
      value: "₹18,500",
    },
  ],

  "Picked up": [
    {
      id: 4,
      date: "17-12-2025",
      shipmentId: "RET10004",
      orderId: "ORD90004",
      sellerId: "SEL004",
      name: "Aakash Store",
      value: "₹32,000",
    },
  ],

  "In transit (Return)": [
    {
      id: 5,
      date: "18-12-2025",
      shipmentId: "RET10005",
      orderId: "ORD90005",
      sellerId: "SEL005",
      name: "Fashion Hub",
      value: "₹55,000",
    },
  ],

  "RTO in transit": [
    {
      id: 6,
      date: "19-12-2025",
      shipmentId: "RTO20001",
      orderId: "ORD90006",
      sellerId: "SEL006",
      name: "Urban Wear",
      value: "₹21,000",
    },
  ],

  "RTO received": [
    {
      id: 7,
      date: "20-12-2025",
      shipmentId: "RTO20002",
      orderId: "ORD90007",
      sellerId: "SEL007",
      name: "Trendy Store",
      value: "₹60,000",
    },
  ],

  "QC in progress": [
    {
      id: 8,
      date: "21-12-2025",
      shipmentId: "QC30001",
      orderId: "ORD90008",
      sellerId: "SEL008",
      name: "Style Point",
      value: "₹15,500",
    },
  ],

  "QC failed": [
    {
      id: 9,
      date: "22-12-2025",
      shipmentId: "QC30002",
      orderId: "ORD90009",
      sellerId: "SEL009",
      name: "Fab India",
      value: "₹9,800",
    },
  ],

  "Return completed": [
    {
      id: 10,
      date: "23-12-2025",
      shipmentId: "RET10010",
      orderId: "ORD90010",
      sellerId: "SEL010",
      name: "Royal Fashion",
      value: "₹72,000",
    },
  ],

  "Refund completed": [
    {
      id: 11,
      date: "24-12-2025",
      shipmentId: "REF50001",
      orderId: "ORD90011",
      sellerId: "SEL011",
      name: "Classic Wear",
      value: "₹33,000",
    },
  ],
};

const Movement = ({ activeSub }) => {
  if (!activeSub || !MOVEMENT_TABLE_DATA[activeSub]) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        🟡 All time {activeSub} order details
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: "14px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F8C20A" }}>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Shipment ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Seller ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Order Value (₹)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {MOVEMENT_TABLE_DATA[activeSub].map((row) => (
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

export default Movement;
