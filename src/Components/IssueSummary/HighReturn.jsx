import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";

/* 🔹 Dummy blocked account data */
const BLOCKED_DATA = [
  {
    id: 1,
    sellerId: "XZY058",
    name: "Khushal",
    email: "KhushalSatani@gmail.com",
    launchDate: "12-12-2025",
    status: "Inactive",
    action: "Reviewed",
  },
  {
    id: 2,
    sellerId: "XKHY08",
    name: "Hemal",
    email: "KhushalSatani@gmail.com",
    launchDate: "12-12-2025",
    status: "Inactive",
    action: "Pending",
  },
  {
    id: 3,
    sellerId: "KHU005",
    name: "Hitesh",
    email: "KhushalSatani@gmail.com",
    launchDate: "12-12-2025",
    status: "Inactive",
    action: "Reviewed",
  },
  {
    id: 4,
    sellerId: "XZY058",
    name: "Jay",
    email: "KhushalSatani@gmail.com",
    launchDate: "12-12-2025",
    status: "Inactive",
    action: "Pending",
  },
  {
    id: 5,
    sellerId: "XZY058",
    name: "Aman",
    email: "hemal@gmail.com",
    launchDate: "12-12-2025",
    status: "Inactive",
    action: "Pending",
  },
  {
    id: 6,
    sellerId: "XZY058",
    name: "Meet",
    email: "KhushalSatani@gmail.com",
    launchDate: "12-12-2025",
    status: "Inactive",
    action: "Pending",
  },
];

const HighReturn = () => {
  const [data, setData] = useState(BLOCKED_DATA);
  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const handleActionChange = (id, value) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, action: value } : row))
    );
  };

  const filteredData = data.filter(
    (row) =>
      row.sellerId.toLowerCase().includes(searchId.toLowerCase()) &&
      row.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px", py: 4 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box sx={{ display: "flex",alignItems:"center",gap:"10px" }}>
          <Typography fontSize={30} fontWeight={600}>
            High Return
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search by Seller Id"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            sx={{
              width: 180,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                bgcolor: "#F9FAFB",
              },
            }}
          />
          <TextField
            size="small"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            sx={{
              width: 180,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                bgcolor: "#F9FAFB",
              },
            }}
          />
        </Stack>
      </Stack>

      {/* Table */}
      <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#FF6B91",
                "& th": {
                  color: "#000",
                  fontWeight: 700,
                },
              }}
            >
              <TableCell>Seller ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Launch Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "& td": {
                    borderBottom: "1px solid #E0E0E0",
                  },
                }}
              >
                <TableCell>{row.sellerId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.launchDate}</TableCell>
                <TableCell>{row.status}</TableCell>

                {/* Action Dropdown */}
                <TableCell align="center">
                  <Select
                    size="small"
                    value={row.action}
                    onChange={(e) => handleActionChange(row.id, e.target.value)}
                    sx={{
                      minWidth: 110,
                      fontWeight: 600,
                      color: "#000",
                      bgcolor:
                        row.action === "Reviewed" ? "#2EE66B" : "#FF6B91",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="Reviewed">Reviewed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};



export default HighReturn
