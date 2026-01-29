import React, { useEffect, useState } from "react";
import Calendar from "../Components/Home/Calendar";
import { Box, Container } from "@mui/material";
import DashboardStats from "../Components/Home/DashboardStats";
import SalesReportChart from "../Components/Home/SalesReportChart";
import IssueSummary from "../Components/Home/IssueSummary";
import TopPerformer from "../Components/Home/TopPerformer";
import OrderReturnChart from "../Components/Home/OrderReturnChart";
import axiosInstance from "../Components/Form/axiosInstance";

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
    <Container maxWidth={false} sx={{ maxWidth: "1400px", fontFamily: "Inter" }}>
      <Calendar user={user} />

      {/* ✅ FIX HERE */}
      <DashboardStats statsData={user} loading={loading} />


      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 2,
          alignItems: "stretch",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ flex: 2.5, minWidth: 0 }}>
          <SalesReportChart user={user} />
        </Box>

        <Box sx={{ flex: 1.3, minWidth: 320, maxWidth: 420 }}>
          <IssueSummary user={user}  loading={loading} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "stretch" }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TopPerformer user={user} />
        </Box>

        <Box sx={{ flex: "0 0 360px" }}>
          <OrderReturnChart user={user}  loading={loading} />
        </Box>
      </Box>              

      <Box sx={{ mb: 10 }} />
    </Container>
  );
};

export default Home;
