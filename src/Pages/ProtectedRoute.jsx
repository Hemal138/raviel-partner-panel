import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../Components/context/UserProvider";

const isProfileIncomplete = (user) => {
  const profile = user?.payload;
  const business = profile?.userBusinessDetails;

  if (!profile) return true;
  if (!profile.firstName) return true;
  if (!profile.lastName) return true;
  if (!profile.phoneNumber) return true;

  if (!business) return true;

  const businessName = business.businessName || business.business_name;
  const gstNumber = business.gstNumber || business.gst_number;
  const gstAddress = business.gstAddress || business.gst_address;

  if (!businessName || !gstNumber || !gstAddress) return true;

  return false;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  if (loading) return <div>Loading...</div>;

  if (!token || !user?.payload) {
    return <Navigate to="/login" replace />;
  }

  // ✅ IMPORTANT: allow onboarding freely
  if (location.pathname === "/onboarding") {
    return children;
  }

  const incomplete = isProfileIncomplete(user);

  if (incomplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
