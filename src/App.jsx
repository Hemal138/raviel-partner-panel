import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";

import ProtectedRoute from "./Pages/ProtectedRoute";
import PublicRoute from "./Pages/PublicRoute";

import Layout from "./Components/Global/Layout";

// Pages
import Home from "./Pages/Home";
import Shipment from "./Pages/Shipment";
import MySeller from "./Pages/MySeller";
import Payout from "./Pages/Payout";
import Download from "./Pages/Download";
import Attendance from "./Pages/Attendance";
import SellerPartner from "./Pages/Seller_Partner";
import Profile from "./Pages/Profile";

// Auth
import Login from "./Components/Form/Login";
import Register from "./Components/Form/Register";

// Issue Summary
import AccountBlocked from "./Components/IssueSummary/AccountBlocked";
import CanceledbySeller from "./Components/IssueSummary/CanceledbySeller";
import HighReturn from "./Components/IssueSummary/HighReturn";
import AddNewSeller from "./Pages/AddNewSeller";
import OnBoarding from "./Components/Form/OnBoarding";
import EditProfile from "./Components/Profile/EditProfile";

import { Toaster } from "react-hot-toast";
import PartnerCard from "./Components/PaymentCards.jsx/PartnerCard";
import SellerMain from "./Components/Seller_Desk/SellerMain";
import ScrollToTop from "./Pages/ScrollToTop";
import PaymentOver from "./Components/PaymentCards.jsx/PaymentOver";

const App = () => {
  const theme = useTheme();

  // 👇 Mobile detection (sm and below)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 📱 If Mobile → Show Message Only
  if (isMobile) {
    return (
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        p={3}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Please open this website on Desktop 💻
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This platform is optimized for Desktop & Tablet only.
        </Typography>
      </Box>
    );
  }

  // 💻 Desktop / Tablet → Full Website
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />

      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Onboarding */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnBoarding />
            </ProtectedRoute>
          }
        />

        {/* No sidebar pages */}
        <Route
          path="/paymentover"
          element={
            <ProtectedRoute>
              <PaymentOver />
            </ProtectedRoute>
          }
        />

        <Route
          path="/partner-card"
          element={
            <ProtectedRoute>
              <PartnerCard />
            </ProtectedRoute>
          }
        />

        {/* Sidebar layout pages */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="shipment" element={<Shipment />} />
          <Route path="my_seller" element={<MySeller />} />
          <Route path="add_new_seller" element={<AddNewSeller />} />
          <Route path="payout" element={<Payout />} />
          <Route path="download" element={<Download />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="seller_partner" element={<SellerPartner />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="seller/:id" element={<SellerMain />} />

          {/* Issue Summary */}
          <Route path="issue-summary/account-blocked" element={<AccountBlocked />} />
          <Route path="issue-summary/canceled-by-seller" element={<CanceledbySeller />} />
          <Route path="issue-summary/high-return" element={<HighReturn />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
