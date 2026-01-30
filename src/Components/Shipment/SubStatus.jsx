import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
} from "@mui/material";
import axiosInstance from "../Form/axiosInstance";

const SubStatus = ({ status, subStatus }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!subStatus) return;

    console.log("📡 API Call for SubStatus:", subStatus);

    setLoading(true);
    axiosInstance
      .get("/partner/shipment-status-wise-orders", {
        params: {
          orderStatus: subStatus.toUpperCase(),
        },
      })
      .then((res) => {
        console.log("✅ API Response:", res.data);

        const mapped = (res.data?.payload || []).map((item, i) => ({
          id: i + 1,
          date: item.createdAt
            ? item.createdAt.split("T")[0]
            : item.orderCreatedAt
            ? item.orderCreatedAt.split("T")[0]
            : "-",
          shipmentId: item.shipmentId || "-",
          orderId: item.orderId || "-",
          sellerId: item.sellerDetails?.sellerId || "-",
          name: item.sellerDetails?.sellerName || "-",
          value: item.orderValue ?? 0,
        }));

        setRows(mapped);
      })
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [subStatus]);

  return (
    <Box mt={4}>
      <Typography fontWeight={700} fontSize={18} mb={2}>
        📦 {status} → {subStatus} Orders
      </Typography>

      <Paper elevation={0}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#22c55e" }}>
              <TableCell>Date</TableCell>
              <TableCell>Shipment ID</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Seller ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Order Value</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.shipmentId}</TableCell>
                  <TableCell>{r.orderId}</TableCell>
                  <TableCell>{r.sellerId}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>₹{r.value}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default SubStatus;
