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

  /* 🧾 SAFE SUBSCRIPTIONS ARRAY */
  const subscriptions = Array.isArray(payload.userSubscriptions)
    ? payload.userSubscriptions
    : payload.userSubscriptions
    ? [payload.userSubscriptions]
    : [];

  const activeSub = subscriptions.find((sub) => sub.status);

  const status = activeSub?.status; // active | completed | cancelled | holded

  /* 1️⃣ NO SUBSCRIPTION */
if (!status) {
  if (location.pathname !== "/partner-card") {
    return <Navigate to="/partner-card" replace />;
  }
  return children;
}

/* 2️⃣ COMPLETED */
if (status === "completed") {
  if (location.pathname !== "/paymentover") {
    return <Navigate to="/paymentover" replace />;
  }
  return children;
}

/* 3️⃣ CANCELLED */
if (status === "cancelled") {
  if (location.pathname !== "/issue-summary/canceled-by-seller") {
    return <Navigate to="/issue-summary/canceled-by-seller" replace />;
  }
  return children;
}

/* 4️⃣ HALTED */
if (status === "halted") {
  if (location.pathname !== "/issue-summary/account-blocked") {
    return <Navigate to="/issue-summary/account-blocked" replace />;
  }
  return children;
}

/* 5️⃣ ACTIVE */
  if (status === "active") {
    if (!isOnboarded && location.pathname !== "/onboarding") {
      return <Navigate to="/onboarding" replace />;
    }

    if (
      isOnboarded &&
      (location.pathname === "/onboarding" ||
        location.pathname === "/partner-card")
    ) {
      console.log("status : Active      onboarding : incomplete bug");
      return <Navigate to="/" replace />;
    }
    return children;
  }

  return children;
};

export default ProtectedRoute;
