import React from "react";
import {
  Box,
  Typography,
  Divider,
  Stack,
  Skeleton,
} from "@mui/material";

import WarningIcon from "@mui/icons-material/Warning";
import BlockIcon from "@mui/icons-material/Block";
import GppBadIcon from "@mui/icons-material/GppBad";
import { useNavigate } from "react-router-dom";

const IssueSummary = ({ user, loading }) => {
  const navigate = useNavigate();

  const canceledBySeller = user?.cancelledBySellers ?? 0;
  const highReturn = user?.highReturn ?? 0;
  const inactiveSellers = user?.InactiveSellers ?? 0;

  const RowSkeleton = () => (
    <Stack direction="row" alignItems="center" py={3} px={2}>
      <Skeleton variant="circular" width={26} height={26} sx={{ mr: 2 }} />
      <Skeleton width="60%" height={22} />
      <Skeleton width={30} height={22} sx={{ ml: "auto" }} />
    </Stack>
  );

  return (
    <Box
      sx={{
        width: 420,
        bgcolor: "#fff",
        borderRadius: "18px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        p: 3,
      }}
    >
      {/* Title */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
        <Box
          sx={{
            width: 25,
            height: 25,
            borderRadius: "50%",
            bgcolor: "#ff5c8a",
          }}
        />
        <Typography fontSize={26} fontWeight={700}>
          Issue Summary
        </Typography>
      </Stack>

      {/* Header */}
      <Box
        mb={2}
        sx={{
          bgcolor: "#ff6f9f",
          borderRadius: "10px",
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={500}>Information</Typography>
        <Typography fontWeight={500}>Count</Typography>
      </Box>

      {/* Rows */}
      {loading ? (
        <>
          <RowSkeleton />
          <Divider />
          <RowSkeleton />
          <Divider />
          <RowSkeleton />
        </>
      ) : (
        <>
          {/* Canceled by Seller */}
          <Stack
            direction="row"
            alignItems="center"
            py={3}
            px={2}
            onClick={() =>
              navigate("/issue-summary/canceled-by-seller")
            }
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "translateX(4px)" },
            }}
          >
            <GppBadIcon sx={{ fontSize: 26, mr: 2, color: "#FF7955" }} />
            <Typography flex={1} fontSize={18}>
              Canceled by Seller
            </Typography>
            <Typography fontSize={18} fontWeight={600}>
              {canceledBySeller}
            </Typography>
          </Stack>
          <Divider />

          {/* High Return */}
          <Stack
            direction="row"
            alignItems="center"
            py={3}
            px={2}
            onClick={() => navigate("/issue-summary/high-return")}
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "translateX(4px)" },
            }}
          >
            <WarningIcon sx={{ fontSize: 26, mr: 2, color: "#F8C20A" }} />
            <Typography flex={1} fontSize={18}>
              High Return
            </Typography>
            <Typography fontSize={18} fontWeight={600}>
              {highReturn}
            </Typography>
          </Stack>
          <Divider />

          {/* Account Blocked */}
          <Stack
            direction="row"
            alignItems="center"
            py={3}
            px={2}
            onClick={() =>
              navigate("/issue-summary/account-blocked")
            }
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "translateX(4px)" },
            }}
          >
            <BlockIcon sx={{ fontSize: 26, mr: 2, color: "#FF6692" }} />
            <Typography flex={1} fontSize={18}>
              Account Blocked
            </Typography>
            <Typography fontSize={18} fontWeight={600}>
              {inactiveSellers}
            </Typography>

          </Stack>
        </>
      )}
    </Box>
  );
};

export default IssueSummary;
