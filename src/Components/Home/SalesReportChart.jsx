import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
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
import axiosInstance from "../Form/axiosInstance";

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
      ctx.strokeStyle = "#c7d2fe";
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

/* =========================
   🔹 CONSTANTS
========================= */
const RANGE_MAP = {
  Daily: "daily",
  Monthly: "weekly",
  Annually: "annually",
};

const datasetColors = {
  delivered: "#22c55e",
  return: "#ff4d6d",
  cancel: "#fbbf24",
  movement: "#2563eb",
};

/* =========================
   🔹 COMPONENT
========================= */
const SalesReportChart = () => {
  const [activeRange, setActiveRange] = useState("daily");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     🔹 API CALL
  ========================= */
  const fetchSalesReport = async (range) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/partner/sales-report", {
        params: { timeTenure: range },
      });
      setApiData(res.data?.payload || null);
    } catch (error) {
      console.error("❌ Sales report API error:", error);
      setApiData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesReport(activeRange);
  }, [activeRange]);

  /* =========================
     🔹 CHART DATA
  ========================= */
  const chartData = useMemo(() => {
    if (!apiData) return { labels: [], datasets: [] };

    return {
      labels: apiData.labels || [],
      datasets: Object.keys(datasetColors).map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        data: apiData[key] || [],
        borderColor: datasetColors[key],
        borderDash: [6, 6],
        tension: 0.45,
        pointRadius: 0,
      })),
    };
  }, [apiData]);

  /* =========================
     🔹 OPTIONS
  ========================= */
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
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
          callback: (v) => (v >= 1000 ? `${v / 1000}k` : v),
        },
      },
    },
  };

  const legendItem = (color, label) => (
    <Stack direction="row" spacing={1} alignItems="center" key={label}>
      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }} />
      <Typography fontSize={12}>{label}</Typography>
    </Stack>
  );

  /* =========================
     🔹 RENDER
  ========================= */
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
          {Object.keys(RANGE_MAP).map((label) => {
            const value = RANGE_MAP[label];
            return (
              <Button
                key={value}
                size="small"
                disabled={loading}
                onClick={() => setActiveRange(value)}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontSize: 12,
                  bgcolor:
                    activeRange === value ? "#0f172a" : "#f1f5f9",
                  color:
                    activeRange === value ? "#fff" : "#475569",
                  "&:hover": {
                    bgcolor:
                      activeRange === value ? "#020617" : "#e5e7eb",
                  },
                }}
              >
                {label}
              </Button>
            );
          })}
        </Stack>
      </Box>

      {/* CHART */}
      <Box sx={{ height: 320, position: "relative" }}>
        {!loading && (
          <Line data={chartData} options={options} />
        )}

        {loading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(255,255,255,0.75)",
              zIndex: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SalesReportChart;
