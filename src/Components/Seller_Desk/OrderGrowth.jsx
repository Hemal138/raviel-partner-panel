import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Stack,
} from "@mui/material";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

/* ================= DATA ================= */
const dailyData = [
  { label: "Mon", value: 420 },
  { label: "Tue", value: 680 },
  { label: "Wed", value: 540 },
  { label: "Thu", value: 720 },
  { label: "Fri", value: 610 },
  { label: "Sat", value: 830 },
  { label: "Sun", value: 760 },
];

const weeklyData = [
  { label: "W1", value: 1800 },
  { label: "W2", value: 2400 },
  { label: "W3", value: 2100 },
  { label: "W4", value: 2700 },
];

const yearlyData = [
  { label: "JAN", value: 2600 },
  { label: "FEB", value: 3300 },
  { label: "MAR", value: 2000 },
  { label: "APR", value: 2900 },
  { label: "MAY", value: 4100 },
  { label: "JUN", value: 3400 },
  { label: "JUL", value: 3800 },
  { label: "AUG", value: 3500 },
  { label: "SEP", value: 3000 },
  { label: "OCT", value: 2700 },
  { label: "NOV", value: 2200 },
  { label: "DEC", value: 3900 },
];

/* ================= TOOLTIP ================= */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <Paper
        elevation={4}
        sx={{
          p: 1.5,
          borderRadius: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {payload[0].payload.label}
        </Typography>
        <Typography fontWeight={700}>
          {payload[0].value.toLocaleString()} Orders
        </Typography>
      </Paper>
    );
  }
  return null;
};

/* ================= COMPONENT ================= */
const OrderGrowth = () => {
  const [range, setRange] = useState("annually");

  const chartData = useMemo(() => {
    if (range === "daily") return dailyData;
    if (range === "weekly") return weeklyData;
    return yearlyData;
  }, [range]);

  const totalValue = useMemo(
    () => chartData.reduce((sum, item) => sum + item.value, 0),
    [chartData]
  );

  return (
    <Paper
      elevation={2}
      sx={{
        // mt: 3,
        p: 3,
        borderRadius: 3,
        background: "#fff",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={3}>
        {/* ===== Header ===== */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                letterSpacing: 1,
                mb: 1,
              }}
            >
              ORDER GROWTH
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {totalValue.toLocaleString()}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
              <TrendingUpIcon sx={{ fontSize: 16, color: "#16a34a" }} />
              <Typography
                variant="caption"
                sx={{ color: "#16a34a", fontWeight: 600 }}
              >
                +12.5% vs last period
              </Typography>
            </Stack>
          </Box>

          {/* Toggle */}
          <ToggleButtonGroup
            value={range}
            exclusive
            onChange={(e, val) => val && setRange(val)}
            sx={{
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              p: 0.3,
            }}
          >
            {["daily", "weekly", "annually"].map((item) => (
              <ToggleButton
                key={item}
                value={item}
                sx={{
                  px: 2,
                  textTransform: "capitalize",
                  fontWeight: 600,
                  border: "none",
                  "&.Mui-selected": {
                    bgcolor: "#000",
                    color: "#fff",
                  },
                }}
              >
                {item}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>

        {/* ===== Chart ===== */}
        <Box>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="lightFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#000" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 6"
                stroke="#e5e7eb"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#000", fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#000", fontSize: 12 }}
                tickFormatter={(v) =>
                  v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v
                }
              />

              <Tooltip content={<CustomTooltip />} cursor={false} />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#000"
                strokeWidth={3}
                fill="url(#lightFill)"
                activeDot={{
                  r: 6,
                  fill: "#000",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Paper>
  );
};

export default OrderGrowth;
