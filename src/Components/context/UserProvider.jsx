import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "../Profile/userApi";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch user from backend
  const refreshUser = async () => {
    try {
      const data = await getUserProfile();
      setUser(data);
      return data; // 🔥 useful for await
    } catch (err) {
      console.error("Failed to refresh user:", err);
      setUser(null);
      return null;
    }
  };

  // 🚀 Initial load (app start / refresh)
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      await refreshUser();
      setLoading(false);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
