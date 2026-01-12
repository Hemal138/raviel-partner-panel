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
} from "@mui/material";
import SearchFilters from "./SearchFilters";

/* 🔹 Mock API Data (Replace with real API later) */
const fetchSellerPayouts = () =>
  Promise.resolve([
    {
      month: "08-2025",
      sellerId: "XYZPOIW",
      sellerName: "Khushal Satani",
      fixed: "₹2,000",
      nmv: "₹17,000",
      final: "₹19,000",
      received: true,
    },
    {
      month: "08-2025",
      sellerId: "ABCD123",
      sellerName: "Rohit Patel",
      fixed: "₹3,500",
      nmv: "₹25,000",
      final: "₹28,500",
      received: false,
    },
    {
      month: "09-2025",
      sellerId: "LMN789",
      sellerName: "Amit Shah",
      fixed: "₹1,800",
      nmv: "₹14,000",
      final: "₹15,800",
      received: false,
    },
  ]);

const SellerWisePayoutSummary = () => {
  const [allRows, setAllRows] = useState([]); // original data
  const [rows, setRows] = useState([]); // filtered data

  const [month, setMonth] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [sellerName, setSellerName] = useState("");

  /* 🔹 Fetch data (API simulation) */
  useEffect(() => {
    fetchSellerPayouts().then((data) => {
      setAllRows(data);
      setRows(data);
    });
  }, []);

  /* 🔹 Toggle Received */
  const toggleReceived = (index) => {
    const updated = [...rows];
    updated[index].received = !updated[index].received;
    setRows(updated);

    // also update original data
    setAllRows((prev) =>
      prev.map((item) =>
        item.sellerId === updated[index].sellerId
          ? { ...item, received: updated[index].received }
          : item
      )
    );
  };

  /* 🔹 Apply Filters */
  const handleApply = () => {
    const filtered = allRows.filter((row) => {
      return (
        (!month || row.month === month) &&
        (!sellerId ||
          row.sellerId.toLowerCase().includes(sellerId.toLowerCase())) &&
        (!sellerName ||
          row.sellerName.toLowerCase().includes(sellerName.toLowerCase()))
      );
    });

    setRows(filtered);
  };

  return (
    <Box sx={{ pt: 3 }}>
      <Paper elevation={1} sx={{ p: 3, borderRadius: "16px" }}>
        <Typography fontWeight={700} fontSize={18} mb={3}>
          Seller Wise Payout Summary
        </Typography>

        {/* 🔍 Dynamic Search */}
        <SearchFilters
          month={month}
          setMonth={setMonth}
          sellerId={sellerId}
          setSellerId={setSellerId}
          sellerName={sellerName}
          setSellerName={setSellerName}
          onApply={handleApply}
        />

        {/* 📊 Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#36C76C",
                  "& td": { borderBottom: "none" },
                }}
              >
                {[
                  "Month",
                  "Seller Id",
                  "Seller Name",
                  "Fixed Payment",
                  "NMV Payment",
                  "Final Amount",
                  "Received",
                ].map((head, index, arr) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: 700,
                      ...(index === 0 && {
                        borderTopLeftRadius: "14px",
                        borderBottomLeftRadius: "14px",
                      }),
                      ...(index === arr.length - 1 && {
                        borderTopRightRadius: "14px",
                        borderBottomRightRadius: "14px",
                      }),
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.sellerId}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.sellerId}</TableCell>
                  <TableCell>{row.sellerName}</TableCell>
                  <TableCell>{row.fixed}</TableCell>
                  <TableCell>{row.nmv}</TableCell>
                  <TableCell>{row.final}</TableCell>
                  <TableCell>
                    <Switch
                      checked={row.received}
                      onChange={() => toggleReceived(index)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#4cff9f",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#4cff9f",
                          },
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
      </Paper>
    </Box>
  );
};

export default SellerWisePayoutSummary;
