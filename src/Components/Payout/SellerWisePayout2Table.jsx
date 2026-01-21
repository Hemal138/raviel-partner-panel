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

const SellerWisePayout2Table = ({ rows, loading, onToggle }) => {
  const INITIAL_COUNT = 5;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [updatingId, setUpdatingId] = useState(null);

  const showMore = visibleCount < rows.length;
  const showLess = visibleCount > INITIAL_COUNT;

  // ✅ SAFE TOGGLE HANDLER
  const handleToggle = async (sellerId, value) => {
    if (typeof onToggle !== "function") return;
    setUpdatingId(sellerId);
    await onToggle(sellerId, value);
    setUpdatingId(null);
  };

  return (
    <Box sx={{ pt: 3, width: "100%" }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography fontWeight={700} fontSize={18} mb={3}>
          Seller Wise NMV Payout Summary
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : rows.length === 0 ? (
          <Typography align="center">No sellers found</Typography>
        ) : (
          <>
            <TableContainer>
              <Table tableLayout="fixed">
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "#36C76C",
                      "& td": { fontWeight: 700 },
                    }}
                  >
                    <TableCell width="15%">Month</TableCell>
                    <TableCell width="20%">Seller Id</TableCell>
                    <TableCell width="30%">Seller Name</TableCell>
                    <TableCell width="20%">NMV Payment</TableCell>
                    <TableCell width="15%">Received</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.slice(0, visibleCount).map((row) => (
                    <TableRow key={`${row.sellerId}-${row.month}`}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.sellerId}</TableCell>
                      <TableCell>{row.sellerName}</TableCell>
                      <TableCell>₹{row.nmv}</TableCell>
                      <TableCell>
                        <Switch
                          checked={row.received}
                          disabled={updatingId === row.sellerId}
                          onChange={(e) =>
                            handleToggle(
                              row.sellerId,
                              e.target.checked // ✅ true / false
                            )
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#4cff9f",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              { backgroundColor: "#4cff9f" },
                            "& .MuiSwitch-track": {
                              backgroundColor: "#ff4d4d",
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {rows.length > INITIAL_COUNT && (
              <Box display="flex" justifyContent="center" gap={2} mt={2}>
                {showMore && (
                  <Button
                    sx={{
                      borderRadius: "20px",
                      border: "1px solid black",
                      color: "black",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "#36C66C",
                        color: "white",
                        border: "1px solid #36C66C",
                      },
                    }}
                    onClick={() => setVisibleCount(rows.length)}
                  >
                    Show More
                  </Button>
                )}

                {showLess && (
                  <Button
                    sx={{
                      borderRadius: "20px",
                      border: "1px solid black",
                      color: "black",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "#36C66C",
                        color: "white",
                        border: "1px solid #36C66C",
                      },
                    }}
                    onClick={() => setVisibleCount(INITIAL_COUNT)}
                  >
                    Show Less
                  </Button>
                )}
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default SellerWisePayout2Table;
