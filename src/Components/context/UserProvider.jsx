import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "../Profile/userApi";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch / Refetch user from backend (NO refresh needed)
  const refreshUser = async () => {
    try {
      const data = await getUserProfile();
      setUser(data);
      return data; // 🔥 so we can await it after onboarding
    } catch (err) {
      console.error("Failed to refresh user:", err);
      setUser(null);
      return null;
    }
  };

  // 🚀 Initial app load
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      await refreshUser(); // 👈 initial user fetch
      setLoading(false);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        refreshUser, // 👈 THIS is what we will use after onboarding
         refetchUser: refreshUser, // alias
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
