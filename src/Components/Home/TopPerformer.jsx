import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axiosInstance from "../Form/axiosInstance"; // path adjust karjo

const TopPerformer = ({ uploadStatus }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopPerformers = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/partner/top-performer-sellers",
        {
          params: { sellerCount: 5 },
        }
      );

      if (res.data?.success) {
        setRows(res.data.payload || []);
      }
    } catch (error) {
      console.error("❌ Failed to fetch top performers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopPerformers();
  }, [uploadStatus]);

  return (
    <Box
      sx={{
        mt: 2,
        bgcolor: "#fff",
        borderRadius: "18px",
        p: 3,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        height: "100%",
      }}
    >
      {/* Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            width: 25,
            height: 25,
            borderRadius: "50%",
            bgcolor: "#34c759",
          }}
        />
        <Typography fontSize={26} fontWeight={700}>
          Top Performer
        </Typography>
      </Box>

      {/* Header */}
      <Box
        sx={{
          bgcolor: "#40c76a",
          borderRadius: "10px",
          px: 2,
          py: 1.5,
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1.5fr 1.5fr",
        }}
      >
        <Typography fontWeight={700}>Seller ID</Typography>
        <Typography fontWeight={700}>Name</Typography>
        <Typography fontWeight={700}>Total Order</Typography>
        <Typography fontWeight={700}>GMV</Typography>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}

      {/* No Data */}
      {!loading && rows.length === 0 && (
        <Typography sx={{ py: 3, textAlign: "center" }}>
          No data found
        </Typography>
      )}

      {/* Data Rows */}
      {!loading &&
        rows.map((row, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1.5fr 1.5fr",
              px: 2,
              py: 2,
              borderBottom: "1px solid #cfcfcfff",
              alignItems: "center",
            }}
          >
            <Typography fontSize={16}>{row.sellerId}</Typography>
            <Typography fontSize={16}>{row.sellerName}</Typography>
            <Typography fontSize={16}>{row.totalOrder}</Typography>
            <Typography fontSize={16}>
              ₹{Number(row.GMV).toLocaleString("en-IN")}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default TopPerformer;
