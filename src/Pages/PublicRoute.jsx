import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../Components/context/UserProvider";

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const { user } = useUser();
  const location = useLocation();

  if (token && user?.payload) {
    const payload = user.payload;

    const isOnboarded = payload.isOnboardingCompleted === true;

    const subscriptions = Array.isArray(payload.userSubscriptions)
      ? payload.userSubscriptions
      : payload.userSubscriptions
      ? [payload.userSubscriptions]
      : [];

    const hasActiveSubscription = subscriptions.some(
      (sub) => sub.status === "active"
    );

    // ✅ Fully ready user → dashboard
    if (hasActiveSubscription && isOnboarded) {
      return <Navigate to="/" replace />;
    }

    // ❌ Paid but onboarding pending
    if (hasActiveSubscription && !isOnboarded) {
      return <Navigate to="/onboarding" replace />;
    }

    // ❌ Logged in but not paid
    if (!hasActiveSubscription) {
      return <Navigate to="/partner-card" replace />;
    }
  }

  return children;
};

export default PublicRoute;
