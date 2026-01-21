import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";

const SellerWisePayoutSummary = ({ rows = [], loading, onToggle }) => {
  const INITIAL_COUNT = 5;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [updatingId, setUpdatingId] = useState(null);

  const handleToggle = async (sellerId, value) => {
    if (!onToggle) return;

    setUpdatingId(sellerId);

    try {
      await onToggle(sellerId, value, "Fixed");

      // ✅ SUCCESS TOAST
      toast.success(
        value
          ? "Fixed payment marked as received"
          : "Fixed payment marked as not received"
      );
    } catch (error) {
      // ❌ ERROR TOAST
      toast.error("Failed to update fixed payment status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <Box sx={{ pt: 3, width: "100%" }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography fontWeight={700} fontSize={18} mb={3}>
          Seller Wise Fixed Payout Summary
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : rows.length === 0 ? (
          <Typography align="center">No sellers found</Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#36C76C" }}>
                    <TableCell>Month</TableCell>
                    <TableCell>Seller Id</TableCell>
                    <TableCell>Seller Name</TableCell>
                    <TableCell>Fixed Payment</TableCell>
                    <TableCell>Received</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.slice(0, visibleCount).map((row) => (
                    <TableRow key={`${row.sellerId}-${row.month}`}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.sellerId}</TableCell>
                      <TableCell>{row.sellerName}</TableCell>
                      <TableCell>₹{row.fixed}</TableCell>
                      <TableCell>
                        <Switch
                          checked={Boolean(row.fixedPaymentReceivedOrNot)}
                          disabled={updatingId === row.sellerId}
                          onChange={(e) =>
                            handleToggle(
                              row.sellerId,
                              e.target.checked
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {rows.length > INITIAL_COUNT && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Button onClick={() => setVisibleCount(rows.length)}>
                  Show More
                </Button>
                <Button onClick={() => setVisibleCount(INITIAL_COUNT)}>
                  Show Less
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default SellerWisePayoutSummary;
