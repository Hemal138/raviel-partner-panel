import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Delivered = ({ data }) => {
  const orders = [
    {
      date: "12-12-2025",
      shipmentId: "17655219643821301052J",
      orderId: "17655219643821301052J",
      sellerId: "XZY058",
      name: "Hemal Creation",
      value: "₹10,05,000",
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        🟢 All time {data.label.toLowerCase()} order details
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: "14px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#22c55e"}}>
              {[
                "Date",
                "Shipment ID",
                "Order ID",
                "Seller ID",
                "Name",
                "Order Value (₹)",
              ].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700,color:"white" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((row, i) => (
              <TableRow key={i}>
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

export default Delivered;
