import React from "react";
import Calendar from "../Components/Home/Calendar";
import { Box, Container } from "@mui/material";
import DashboardStats from "../Components/Home/DashboardStats";
import SalesReportChart from "../Components/Home/SalesReportChart";
import IssueSummary from "../Components/Home/IssueSummary";
import TopPerformer from "../Components/Home/TopPerformer";
import OrderReturnChart from "../Components/Home/OrderReturnChart";

const Home = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1400px", fontFamily: "Inter" }}
      >
        <Calendar />
        <DashboardStats />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 2,
            alignItems: "stretch", // 👈 key
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Sales Report – Wide */}
          <Box
            sx={{
              flex: 2.5,
              minWidth: 0,
              display: "flex",
            }}
          >
            <Box sx={{ width: "100%", height: "100%" }}>
              <SalesReportChart />
            </Box>
          </Box>

          {/* Issue Summary */}
          <Box
            sx={{
              flex: 1.3,
              minWidth: 320,
              maxWidth: 420,
              display: "flex",
            }}
          >
            <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
              <IssueSummary />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "stretch",
          }}
        >
          {/* Table – MAX width */}
          <Box
            sx={{
              flex: 1, // 👈 grow and take remaining space
              minWidth: 0, // 👈 important for tables
            }}
          >
            <TopPerformer />
          </Box>

          {/* Chart – MIN width */}
          <Box
            sx={{
              flex: "0 0 360px", // 👈 fixed / minimum width
            }}
          >
            <OrderReturnChart />
          </Box>
        </Box>
        <Box sx={{mb:10}}></Box>
      </Container>
    </>
  );
};

export default Home;
