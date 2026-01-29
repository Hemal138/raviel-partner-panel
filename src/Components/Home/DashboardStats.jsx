import React from "react";
import {
  Box,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import PixIcon from "@mui/icons-material/Pix";

const DashboardStats = ({ statsData, loading }) => {
  const stats = [
    {
      title: "Total Order",
      value: statsData?.totalOrders ?? 0,
      bg: "#DADAFF",
      iconBg: "#635BFF",
      icon: <CurrencyRupeeIcon />,
    },
    {
      title: "Total GMV",
      value: statsData?.totalGMV ?? 0,
      bg: "#FDF5D9",
      iconBg: "#F8C20A",
      icon: <PixIcon />,
    },
    {
      title: "Pending Acceptance",
      value: statsData?.pendingAcceptance ?? 0,
      bg: "#FFCCDB",
      iconBg: "#FF6692",
      icon: <HourglassBottomIcon />,
    },
    {
      title: "My Payment",
      value: statsData?.myPayment ?? 0,
      bg: "#DEFFEB",
      iconBg: "#36C76C",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      title: "Problematic Order",
      value: statsData?.problematicOrder ?? 0,
      bg: "#FFCFC2",
      iconBg: "#FF7955",
      icon: <ReportProblemOutlinedIcon />,
    },
  ];

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        gap: 3,
        flexWrap: "wrap",
        bgcolor: "#fff",
        p: 3,
        borderRadius: 4,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      {(loading ? Array.from(new Array(5)) : stats).map((item, i) => (
        <Box
          key={i}
          sx={{
            flex: "1 1 180px",
            minWidth: 180,
            bgcolor: loading ? "#f5f5f5" : item.bg,
            borderRadius: 4,
            p: 3,
            textAlign: "center",
          }}
        >
          {/* Icon / Skeleton */}
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={48}
              height={48}
              sx={{ mx: "auto", mb: 2.5, borderRadius: 2 }}
            />
          ) : (
            <Box
              sx={{
                width: 48,
                height: 48,
                mx: "auto",
                mb: 2.5,
                borderRadius: 2,
                bgcolor: item.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              {item.icon}
            </Box>
          )}

          {/* Title */}
          {loading ? (
            <Skeleton width="70%" sx={{ mx: "auto" }} />
          ) : (
            <Typography fontSize={16} fontWeight={500}>
              {item.title}
            </Typography>
          )}

          {/* Value */}
          {loading ? (
            <Skeleton width="50%" height={28} sx={{ mx: "auto", mt: 1 }} />
          ) : (
            <Typography fontSize={20} fontWeight={700} mt={0.5}>
              {item.value.toLocaleString()}
            </Typography>
          )}

          {/* Button */}
          {loading ? (
            <Skeleton
              width={90}
              height={32}
              sx={{ mx: "auto", mt: 2.5, borderRadius: 2 }}
            />
          ) : (
            <Button
              size="small"
              sx={{
                mt: 2.5,
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                py: 1,
                fontSize: 12,
                bgcolor: "#fff",
                color: "#111",
                "&:hover": {
                  bgcolor: "#000",
                  color: "#fff",
                },
              }}
            >
              View details
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default DashboardStats;
