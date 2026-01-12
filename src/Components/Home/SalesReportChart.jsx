import React, { useState, useMemo } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

/* =========================
   🔹 HOVER LINE PLUGIN
========================= */
const hoverLinePlugin = {
  id: "hoverLine",
  afterDraw: (chart) => {
    if (chart.tooltip?._active?.length) {
      const ctx = chart.ctx;
      const activePoint = chart.tooltip._active[0];
      const x = activePoint.element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#c7d2fe"; // hover line color
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.restore();
    }
  },
};

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  hoverLinePlugin
);

const SalesReportChart = () => {
  const [activeRange, setActiveRange] = useState("Daily");

  /* =========================
     🔹 DYNAMIC DATA SOURCE
  ========================= */
  const chartDataMap = {
    Daily: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      Delivered: [20, 40, 35, 60, 55, 30, 45],
      Return: [5, 15, 10, 20, 18, 12, 8],
      Cancel: [2, 8, 6, 10, 7, 4, 3],
      Movement: [10, 20, 15, 30, 25, 18, 12],
    },

    Monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],

      Delivered: [2700, 1600, 1400, 1500],
      Return: [3400, 2100, 1000, 2400],
      Cancel: [2300, 900, 700, 950],
      Movement: [1400, 450, 350, 1050],
    },

    Annually: {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      Delivered: [0, 300, 800, 1200, 400, 200, 100, 200, 400, 900, 600, 0],
      Return: [100, 1500, 1800, 700, 600, 800, 200, 100, 900, 1100, 300, 100],
      Cancel: [0, 900, 1100, 300, 200, 400, 0, 100, 600, 300, 50, 0],
      Movement: [0, 500, 700, 200, 100, 150, 80, 120, 300, 500, 200, 50],
    },
  };

  const datasetColors = {
    Delivered: "#22c55e",
    Return: "#ff4d6d",
    Cancel: "#fbbf24",
    Movement: "#2563eb",
  };

  /* =========================
     🔹 BUILD DATA DYNAMICALLY
  ========================= */
  const chartData = useMemo(() => {
    const current = chartDataMap[activeRange];

    return {
      labels: current.labels,
      datasets: Object.keys(datasetColors).map((key) => ({
        label: key,
        data: current[key],
        borderColor: datasetColors[key],
        borderDash: [6, 6],
        tension: 0.45,
        pointRadius: 0,
      })),
    };
  }, [activeRange]);

  /* =========================
     🔹 CHART OPTIONS
  ========================= */
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 12 } },
      },
      y: {
        grid: { color: "#eef2f7" },
        ticks: {
          color: "#6b7280",
          callback: (value) => (value >= 1000 ? `${value / 1000}k` : value),
        },
      },
    },
  };

  const legendItem = (color, label) => (
    <Stack direction="row" spacing={1} alignItems="center" key={label}>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: color,
        }}
      />
      <Typography fontSize={12}>{label}</Typography>
    </Stack>
  );

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 3,
        p: 3,
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        minHeight: 420,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography fontWeight={700}>Sales report</Typography>
          <Stack direction="row" spacing={2} mt={1}>
            {legendItem("#22c55e", "Delivered")}
            {legendItem("#ff4d6d", "Return")}
            {legendItem("#fbbf24", "Cancel")}
            {legendItem("#2563eb", "Movement")}
          </Stack>
        </Box>

        {/* RANGE BUTTONS */}
        <Stack direction="row" spacing={1}>
          {["Daily", "Monthly", "Annually"].map((item) => (
            <Button
              key={item}
              size="small"
              onClick={() => setActiveRange(item)}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontSize: 12,
                bgcolor: activeRange === item ? "#0f172a" : "#f1f5f9",
                color: activeRange === item ? "#fff" : "#475569",
                "&:hover": {
                  bgcolor: activeRange === item ? "#020617" : "#e5e7eb",
                },
              }}
            >
              {item}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* CHART */}
      <Box sx={{ height: 320 }}>
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default SalesReportChart;
