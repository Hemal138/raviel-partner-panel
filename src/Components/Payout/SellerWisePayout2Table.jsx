import React, { useEffect, useState } from "react";
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
  Skeleton,
} from "@mui/material";
import toast from "react-hot-toast";

const SellerWisePayout2Table = ({ rows = [], loading, onToggle }) => {
  const INITIAL_COUNT = 5;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [tableRows, setTableRows] = useState(rows);
  const [search, setSearch] = useState("");
  const [updatingSellerId, setUpdatingSellerId] = useState(null);

  useEffect(() => {
    setTableRows(rows);
  }, [rows]);

  const filteredRows = tableRows.filter((row) => {
    const q = search.toLowerCase();
    return (
      row.sellerId?.toLowerCase().includes(q) ||
      row.sellerName?.toLowerCase().includes(q)
    );
  });

  const handleToggle = async (row) => {
    const newValue = !row.NMVPaymentReceivedOrNot;

    setTableRows((prev) =>
      prev.map((r) =>
        r.sellerId === row.sellerId && r.month === row.month
          ? { ...r, NMVPaymentReceivedOrNot: newValue }
          : r
      )
    );

    setUpdatingSellerId(row.sellerId);

    try {
      await onToggle(row.sellerId, newValue, "NMV");
      toast.success(
        newValue
          ? "NMV payment marked as received"
          : "NMV payment marked as not received"
      );
    } catch {
      setTableRows((prev) =>
        prev.map((r) =>
          r.sellerId === row.sellerId && r.month === row.month
            ? { ...r, NMVPaymentReceivedOrNot: !newValue }
            : r
        )
      );
      toast.error("Failed to update NMV payment status");
    } finally {
      setUpdatingSellerId(null);
    }
  };

  return (
    <Box sx={{ pt: 3, width: "100%" }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        {/* ===== HEADER ===== */}
        <Typography fontWeight={700} fontSize={18} mb={2}>
          Seller Wise NMV Payout Summary
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#36C76C" }}>
                <TableCell>Month</TableCell>
                <TableCell>Seller Id</TableCell>
                <TableCell>Seller Name</TableCell>
                <TableCell>NMV Payment</TableCell>
                <TableCell>Received</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* 🔥 SKELETON LOADER */}
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton width="80%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="70%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="90%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="60%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rectangular" width={40} height={24} />
                      </TableCell>
                    </TableRow>
                  ))
                : filteredRows.length === 0
                ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No sellers found
                    </TableCell>
                  </TableRow>
                )
                : filteredRows
                    .slice(0, visibleCount)
                    .map((row) => (
                      <TableRow key={`${row.sellerId}-${row.month}`}>
                        <TableCell>{row.NMVPaymentDate}</TableCell>
                        <TableCell>{row.sellerId}</TableCell>
                        <TableCell>{row.sellerName}</TableCell>
                        <TableCell>₹{row.nmv}</TableCell>
                        <TableCell>
                          <Switch
                            checked={Boolean(row.NMVPaymentReceivedOrNot)}
                            onChange={() => handleToggle(row)}
                            disabled={updatingSellerId === row.sellerId}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
            </TableBody>
          </Table>
        </TableContainer>

        {!loading && filteredRows.length > INITIAL_COUNT && (
          <Box display="flex" justifyContent="center" mt={2} gap={2}>
            <Button onClick={() => setVisibleCount(filteredRows.length)}>
              Show More
            </Button>
            <Button onClick={() => setVisibleCount(INITIAL_COUNT)}>
              Show Less
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default SellerWisePayout2Table;
