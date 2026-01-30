import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axiosInstance from "../Form/axiosInstance";

import SubStatus from "./SubStatus";

/* =========================
   🔹 COMPONENT MAP
========================= */
const COMPONENT_MAP = {
  SubStatus,
};

/* =========================
   🔹 CARD STYLE
========================= */
const cardStyle = {
  borderRadius: "18px",
  padding: "24px 28px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
};

const ShipmentStatus = () => {
  const [shipmentData, setShipmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState("Delivered");
  const [selectedSubStatus, setSelectedSubStatus] = useState(null);

  console.log("✅ Shipment Status Summary:", shipmentData);
  /* =========================
     🔹 FETCH STATUS SUMMARY
  ========================= */
useEffect(() => {
  axiosInstance
    .get("/partner/shipment-status-report", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
    .then((res) => {
      console.log("API RESPONSE:", res);
      setShipmentData(res.data?.payload?.mainData || null);
    })
    .catch((err) => {
      console.error("API ERROR:", err);
      setShipmentData(null);
    })
    .finally(() => setLoading(false));
}, []);


  /* =========================
     🔹 BUILD CONFIG
  ========================= */
 const STATUS_CONFIG = useMemo(() => {
  if (!shipmentData) return {};

const mapSub = (obj = {}) =>
  Object.keys(obj).map((key) => ({
    key, // internal use
    label: obj[key]?.label || key, // 👈 CAPITAL label from API
    today: obj[key]?.today ?? 0,
    total: obj[key]?.total ?? 0,
  }));


  return {
    Delivered: {
      color: "#E8FFF0",
      today: shipmentData.delivered?.today ?? 0,
      total: shipmentData.delivered?.total ?? 0,
      subDataList: mapSub(shipmentData.delivered?.subData),
    },
    Canceled: {
      color: "#FFE1E8",
      today: shipmentData.cancelled?.today ?? 0,
      total: shipmentData.cancelled?.total ?? 0,
      subDataList: mapSub(shipmentData.cancelled?.subData),
    },
    Return: {
      color: "#E2E5FF",
      today: shipmentData.return?.today ?? 0,
      total: shipmentData.return?.total ?? 0,
      subDataList: mapSub(shipmentData.return?.subData),
    },
    Movement: {
      color: "#FFF6D9",
      today: shipmentData.movement?.today ?? 0,
      total: shipmentData.movement?.total ?? 0,
      subDataList: mapSub(shipmentData.movement?.subData),
    },
  };
}, [shipmentData]);

  /* =========================
     🔹 LOADER
  ========================= */
  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
        <Typography mt={2}>Loading shipment status…</Typography>
      </Box>
    );
  }

  if (!shipmentData) {
    return (
      <Box p={4}>
        <Typography color="error">No shipment data available</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* =========================
          🔹 TOP SECTION
      ========================= */}
      <Box display="flex" gap={3} height="520px">
        {/* ================= LEFT STATUS CARDS ================= */}
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
          {Object.keys(STATUS_CONFIG).map((key) => {
            const item = STATUS_CONFIG[key];
            return (
              <Box
                key={key}
                onClick={() => {
                  setSelectedStatus(key);
                  setSelectedSubStatus(null);
                  console.log("🟦 Main Status Clicked:", key);
                }}
                sx={{
                  ...cardStyle,
                  bgcolor: item.color,
                  flex: 1,
                  border:
                    selectedStatus === key
                      ? "2px solid #000"
                      : "2px solid transparent",
                }}
              >
                <Typography fontWeight={600} fontSize={18}>
                  {key}
                </Typography>

                <Box textAlign="right">
                  <Typography fontSize={13}>Today / All time</Typography>
                  <Typography fontSize={26} fontWeight={700}>
                    {item.today}/{item.total}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* ================= RIGHT SUB STATUS ================= */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#fff",
            p: 3,
            borderRadius: "20px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            overflowY: "auto",
          }}
        >
          {STATUS_CONFIG[selectedStatus]?.subDataList?.length ? (
            STATUS_CONFIG[selectedStatus].subDataList.map((sub) => (
              <Box
                key={sub.label}
                onClick={() => {
                  setSelectedSubStatus(sub.label);
                  console.log("🟩 SubStatus Clicked:", sub.label);
                }}
                sx={{
                  p: 2.5,
                  mb: 2,
                  borderRadius: "16px",
                  bgcolor: STATUS_CONFIG[selectedStatus].color,
                  cursor: "pointer",
                  border:
                    selectedSubStatus === sub.label
                      ? "2px solid #000"
                      : "2px solid transparent",
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight={600}>{sub.label} </Typography>
                  <Typography fontWeight={700}>
                    {sub.today}/{sub.total}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No sub status data</Typography>
          )}
        </Box>
      </Box>

      {/* =========================
          🔹 BOTTOM TABLE
      ========================= */}
      {selectedSubStatus && (
        <SubStatus
          status={selectedStatus}
          subStatus={selectedSubStatus}
        />
      )}
    </Box>
  );
};

export default ShipmentStatus;
