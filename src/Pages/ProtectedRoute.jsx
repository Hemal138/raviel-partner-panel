import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../Components/context/UserProvider";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  /* ⏳ LOADING */
  if (loading) {
    return (
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  /* 🔐 NOT LOGGED IN */
  if (!token || !user?.payload) {
    return <Navigate to="/login" replace />;
  }

  const payload = user.payload;
  const isOnboarded = payload.isOnboardingCompleted === true;

  /* ✅ SAFE SUBSCRIPTION CHECK */
  const subscriptions = Array.isArray(payload.userSubscriptions)
    ? payload.userSubscriptions
    : payload.userSubscriptions
    ? [payload.userSubscriptions]
    : [];

  const hasActiveSubscription = subscriptions.some(
    (sub) => sub.status === "active"
  );

  /* 🔴 ONBOARDING NOT DONE */
  if (!isOnboarded && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  /* 🔴 ONBOARDED BUT NO ACTIVE SUB */
  if (
    isOnboarded &&
    !hasActiveSubscription &&
    location.pathname !== "/partner-card"
  ) {
    return <Navigate to="/partner-card" replace />;
  }

  /* 🟢 ALLOW ACCESS */
  return children;
};

export default ProtectedRoute;
