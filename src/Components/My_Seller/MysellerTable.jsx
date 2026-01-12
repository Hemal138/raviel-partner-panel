import React, { useState } from "react";
import {
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
  Button,
  Chip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

/* 🔹 Dummy seller data */
const SELLERS = [
  {
    id: 1,
    launchDate: "12-12-2025",
    sellerId: "XZY058",
    name: "Hemal Creation",
    orders: "10,000",
    returns: "10,000",
    duration: "16 Days",
    sku: 1000,
    gmv: "₹10,05,000",
  },
  {
    id: 2,
    launchDate: "12-12-2025",
    sellerId: "XKHY08",
    name: "Khushal satani",
    orders: "50,000",
    returns: "50,000",
    duration: "5 Days",
    sku: 60,
    gmv: "₹99,05,000",
  },
  {
    id: 3,
    launchDate: "12-12-2025",
    sellerId: "KHU005",
    name: "Jayesh Bhayani",
    orders: "90,000",
    returns: "90,000",
    duration: "1 month 5 days",
    sku: 90,
    gmv: "₹70,000",
  },
  {
    id: 4,
    launchDate: "12-12-2025",
    sellerId: "XZY058",
    name: "Hemal Creation",
    orders: "100,000",
    returns: "100,000",
    duration: "3 months 22 days",
    sku: 30,
    gmv: "₹10,05,000",
  },
  {
    id: 5,
    launchDate: "12-12-2025",
    sellerId: "XZY058",
    name: "Hemal Creation",
    orders: "90",
    returns: "90",
    duration: "2 months 5 days",
    sku: 100,
    gmv: "₹10,05,000",
  },
  {
    id: 6,
    launchDate: "12-12-2025",
    sellerId: "XZY058",
    name: "Hemal Creation",
    orders: "90",
    returns: "90",
    duration: "2 months 5 days",
    sku: 100,
    gmv: "₹10,05,000",
  },
];

const MysellerTable = () => {
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [skuInput, setSkuInput] = useState({});
  const navigate = useNavigate();

  const filteredData = SELLERS.filter(
    (item) =>
      item.sellerId.toLowerCase().includes(searchId.toLowerCase()) &&
      item.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const visibleData = showAll ? filteredData : filteredData.slice(0, 5);

  return (
    <Box
      sx={{
        borderRadius: "20px",
        p: 3,
        bgcolor: "#fff",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        mb={3}
      >
        {/* Left Title */}
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ letterSpacing: "0.3px" }}
          >
            My Seller’s
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              mt: 0.5,
            }}
          >
            Total: <b>500</b>
          </Typography>
        </Box>

        {/* Right Controls */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems="center"
        >
          <TextField
            placeholder="Search by Seller ID"
            size="small"
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
            placeholder="Search by Seller Name"
            size="small"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            sx={{
              width: 200,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                bgcolor: "#F9FAFB",
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              borderRadius: "10px",
              px: 2.5,
              py: 1,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
            }}
          >
            Upload Excel
          </Button>
        </Stack>
      </Stack>

      {/* Table */}
      <Paper sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#A8A5FF" }}>
              {[
                "#",
                "Launch Date",
                "Seller ID",
                "Name",
                "Orders",
                "Returns",
                "Duration",
                "Live SKU",
                "GMV",
                "Action",
              ].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.launchDate}</TableCell>
                <TableCell>{row.sellerId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.orders}</TableCell>
                <TableCell>{row.returns}</TableCell>
                <TableCell>{row.duration}</TableCell>

                {/* Live SKU */}
                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      bgcolor: "#F9FAFB",
                      px: 1,
                      py: 0.8,
                      borderRadius: "10px",
                      width: "fit-content",
                    }}
                  >
                    {/* Current SKU */}
                    <Chip
                      label={row.sku}
                      size="small"
                      sx={{
                        bgcolor: "#FFE5E5",
                        color: "#D32F2F",
                        fontWeight: 700,
                        borderRadius: "8px",
                        minWidth: 40,
                        justifyContent: "center",
                      }}
                    />

                    {/* Input */}
                    <TextField
                      size="small"
                      placeholder="New"
                      value={skuInput[row.id] || ""}
                      onChange={(e) =>
                        setSkuInput({
                          ...skuInput,
                          [row.id]: e.target.value,
                        })
                      }
                      inputProps={{
                        style: {
                          textAlign: "center",
                          padding: "6px",
                          fontSize: "13px",
                        },
                      }}
                      sx={{
                        width: 55,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />

                    {/* Update Button */}
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        minWidth: "auto",
                        px: 1.5,
                        py: 0.5,
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: "8px",
                        textTransform: "none",
                      }}
                    >
                      Update
                    </Button>
                  </Stack>
                </TableCell>

                <TableCell>{row.gmv}</TableCell>

                <TableCell
                  sx={{ color: "#1E88E5", cursor: "pointer", fontWeight: 600 }}
                  onClick={() => navigate(`/seller_desk/${row.sellerId}`)}
                >
                  View
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Footer */}
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Box
          onClick={() => setShowAll((p) => !p)}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            px: 2,
            py: 1,
            borderRadius: "999px",
            fontWeight: 600,
            color: "#1E88E5",
            cursor: "pointer",
            "&:hover": { bgcolor: "rgba(30,136,229,0.08)" },
          }}
        >
          {showAll ? "Show less sellers" : "View all sellers"}
          <KeyboardArrowDownIcon
            sx={{
              transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.2s",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MysellerTable;
