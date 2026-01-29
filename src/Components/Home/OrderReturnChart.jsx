import React from "react";
import { Box, Typography, Divider, Skeleton } from "@mui/material";

const OrderReturnChart = ({ user, loading }) => {
  const totalorder = user?.totalOrders ?? 0;
  const returnorder = user?.returnOrders ?? 0;
  console.log(user);
  
  const returnPercent =
    totalorder > 0
      ? Number(((returnorder * 100) / totalorder).toFixed(2))
      : 0;

  // Gauge config
  const cx = 180;
  const cy = 180;
  const r = 120;
  const stroke = 18;

  const angle = (returnPercent / 100) * 180;
  const rad = (Math.PI * angle) / 180;

  const knobX = cx - r * Math.cos(Math.PI - rad);
  const knobY = cy - r * Math.sin(Math.PI - rad);

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: "18px",
        p: 3,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        height: "100%",
        mt: 2,
      }}
    >
      {/* Header */}
      <Typography fontSize={22} fontWeight={700} mb={2}>
        Order & Return
      </Typography>

      {/* Stats */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          color: "#444",
          mb: 1.5,
        }}
      >
        {loading ? (
          <>
            <Skeleton width={140} />
            <Skeleton width={140} />
          </>
        ) : (
          <>
            <Typography>Total order: {totalorder}</Typography>
            <Typography>Return order: {returnorder}</Typography>
          </>
        )}
      </Box>

      <Divider />

      {/* Gauge */}
      {loading ? (
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Skeleton variant="circular" width={200} height={200} />
          <Skeleton width={120} sx={{ mx: "auto", mt: 2 }} />
        </Box>
      ) : (
        <Box
          sx={{
            mt: 5,
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <svg width="360" height="220">
            {/* Background arc */}
            <path
              d={`M ${cx - r} ${cy}
                  A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
              fill="none"
              stroke="#4f46ff"
              strokeWidth={stroke}
              strokeLinecap="round"
            />

            {/* Progress arc */}
            <path
              d={`M ${cx - r} ${cy}
                  A ${r} ${r} 0 0 1 ${
                    cx - r * Math.cos(Math.PI - rad)
                  } ${cy - r * Math.sin(Math.PI - rad)}`}
              fill="none"
              stroke="#e6ebfb"
              strokeWidth={stroke}
              strokeLinecap="round"
            />

            {/* Knob */}
            <circle
              cx={knobX}
              cy={knobY}
              r="16"
              fill="#4f46ff"
              stroke="#fff"
              strokeWidth="5"
              style={{
                filter:
                  "drop-shadow(0px 6px 10px rgba(0,0,0,0.15))",
              }}
            />
          </svg>

          {/* Center text */}
          <Box
            sx={{
              position: "absolute",
              top: "58%",
              textAlign: "center",
            }}
          >
            <Typography fontSize={45} fontWeight={800}>
              {returnPercent}%
            </Typography>
            <Typography fontSize={18} color="#444">
              Return
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OrderReturnChart;
