import React from "react";
import { Box, Typography, Divider, Skeleton } from "@mui/material";

const OrderReturnChart = ({ user, loading }) => {
  const [active, setActive] = React.useState(null);
// "total" | "return" | null

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
<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
  <svg width="260" height="260" viewBox="0 0 260 260">

    {/* TOTAL ORDERS */}
    <circle
      cx="130"
      cy="130"
      r="100"
      fill="none"
      stroke="#FFCFC2"
      strokeWidth={active === "total" ? 26 : 18}
      transform={active === "total" ? "scale(1.05) translate(-6 -6)" : ""}
      style={{ transition: "all 0.35s ease", cursor: "pointer" }}
      onMouseEnter={() => setActive("total")}
      onMouseLeave={() => setActive(null)}
    />

    {/* RETURN ORDERS */}
    <circle
      cx="130"
      cy="130"
      r="100"
      fill="none"
      stroke="#FF7955"
      strokeWidth={active === "return" ? 26 : 18}
      strokeDasharray={`${(returnPercent / 100) * 2 * Math.PI * 100} ${
        2 * Math.PI * 100
      }`}
      strokeLinecap="round"
      transform={`rotate(-90 130 130) ${
        active === "return" ? "scale(1.05) translate(-6 -6)" : ""
      }`}
      style={{ transition: "all 0.35s ease", cursor: "pointer" }}
      onMouseEnter={() => setActive("return")}
      onMouseLeave={() => setActive(null)}
    />

    {/* CENTER TEXT */}
    <text
      x="130"
      y="120"
      textAnchor="middle"
      fontSize="26"
      fontWeight="700"
      fill="#222"
      style={{ transition: "all 0.3s ease" }}
    >
      {active === "total"
        ? totalorder
        : active === "return"
        ? returnorder
        : `${returnPercent}%`}
    </text>

    <text
      x="130"
      y="148"
      textAnchor="middle"
      fontSize="14"
      fill="#666"
    >
      {active === "total"
        ? "Total Orders"
        : active === "return"
        ? "Return Orders"
        : "Returned"}
    </text>
  </svg>
</Box>




      )}
    </Box>
  );
};

export default OrderReturnChart;
