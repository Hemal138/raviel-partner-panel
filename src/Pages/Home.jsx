import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import axiosInstance from "../Components/Form/axiosInstance";

import Calendar from "../Components/Home/Calendar";
import DashboardStats from "../Components/Home/DashboardStats";
import SalesReportChart from "../Components/Home/SalesReportChart";
import IssueSummary from "../Components/Home/IssueSummary";
import TopPerformer from "../Components/Home/TopPerformer";
import OrderReturnChart from "../Components/Home/OrderReturnChart";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLoggedInUser = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/user");
      setUser(res.data?.payload || null);
    } catch (error) {
      console.log("❌ API ERROR:", error?.response || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1400px",
        fontFamily: "Inter",
        pb: 6,
        overflowX: "hidden",
      }}
    >
      {/* 📅 Calendar */}
      <Calendar user={user} />

      {/* 📊 Top Stats */}
      <DashboardStats statsData={user} loading={loading} />

      {/* 📈 Sales Report + Issue Summary */}
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 3fr) minmax(320px, 1.2fr)",
          },
          gap: 2,
          alignItems: "stretch",
          paddingRight:"120px"
        }}
      >
        <SalesReportChart user={user} />
        <IssueSummary user={user} loading={loading} />
      </Box>

      {/* 🏆 Top Performer + Order Return */}
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) 360px",
          },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        <TopPerformer user={user} />
        <OrderReturnChart user={user} loading={loading} />
      </Box>

      {/* Bottom spacing */}
      <Box sx={{ height: 40 }} />
    </Container>
  );
};

export default Home;
