import { Box, Typography, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../Form/axiosInstance";

const SellerWisePayout = ({ payoutRefreshSignal }) => {
  const [totalFixed, setTotalFixed] = useState(0);
  const [totalNMV, setTotalNMV] = useState(0);
  const [finalPayout, setFinalPayout] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayoutSummary = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/user");
        const payload = res.data?.payload;

        setTotalFixed(payload?.totalFixedPayment ?? 0);
        setTotalNMV(payload?.totalNMVPayment ?? 0);
        setFinalPayout(payload?.finalPayout ?? 0);
      } catch (error) {
        console.error("Failed to fetch payout summary", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayoutSummary();
  }, [payoutRefreshSignal]);

  return (
    <Box sx={{ marginBottom: "20px" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {loading ? (
          <Skeleton variant="circular" width={30} height={30} />
        ) : (
          <Box
            sx={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              bgcolor: "#36C76C",
            }}
          />
        )}

        {loading ? (
          <Skeleton width={200} height={30} sx={{ ml: 2 }} />
        ) : (
          <Box sx={{ paddingLeft: "20px", fontSize: "22px", fontWeight: "bold" }}>
            Seller Wise Payout
          </Box>
        )}
      </Box>

      {/* Cards */}
      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 3 }}>
        {[1, 2, 3].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: "30%",
              bgcolor: loading ? "#f5f5f5" : ["#FFCCDB", "#DADAFF", "#DEFFEB"][i],
              p: 3,
              borderRadius: 2,
              m: 1,
            }}
          >
            {loading ? (
              <>
                <Skeleton width="70%" />
                <Skeleton width="40%" height={28} sx={{ mt: 1 }} />
              </>
            ) : (
              <>
                <Typography>
                  {i === 0
                    ? "Total Fixed Payment"
                    : i === 1
                    ? "Total NMV Payment"
                    : "Final Payout"}
                </Typography>
                <Typography fontWeight="bold">
                  ₹{i === 0 ? totalFixed : i === 1 ? totalNMV : finalPayout}
                </Typography>
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SellerWisePayout;
