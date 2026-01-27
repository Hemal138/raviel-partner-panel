  import { Navigate, useLocation } from "react-router-dom";
  import { useUser } from "../Components/context/UserProvider";

  const isProfileIncomplete = (user) => {
    const profile = user?.payload;
    const business = profile?.userBusinessDetails;

    // 🔴 Required user fields
    if (!profile) return true;
    if (!profile.firstName) return true;
    if (!profile.lastName) return true;
    if (!profile.phoneNumber) return true;

    // 🔴 Business object must exist
    if (!business) return true;

    // 🔴 Required business fields ONLY
    const businessName = business.businessName || business.business_name;
    const gstNumber = business.gstNumber || business.gst_number;
    const gstAddress = business.gstAddress || business.gst_address;

    if (!businessName) return true;
    if (!gstNumber) return true;
    if (!gstAddress) return true;

    return false;
  };

  const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();
    const location = useLocation();
    const token = sessionStorage.getItem("token");

    if (loading) return <div>Loading...</div>;

    // 🔐 Not logged in
    if (!token || !user?.payload) {
      return <Navigate to="/login" replace />;
    }

    const incomplete = isProfileIncomplete(user);

    // 🟢 If user tries to open onboarding AGAIN after completion
    if (
      location.pathname === "/onboarding" &&
      !incomplete
    ) {
      return <Navigate to="/partner-card" replace />;
    }

    // 🟢 Allow onboarding if profile incomplete
    if (location.pathname === "/onboarding") {
      return children;
    }

    // 🚧 Force onboarding if profile incomplete
    if (incomplete) {
      return <Navigate to="/onboarding" replace />;
    }

    // ✅ All good
    return children;
  };


  export default ProtectedRoute;
