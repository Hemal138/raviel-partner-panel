import axiosInstance from "../Form/axiosInstance"

// 👤 Get logged-in user profile
export const getUserProfile = async () => {
  try {
    const res = await axiosInstance.get("/user")

    console.log("✅ USER API RESPONSE:", res.data)

    return res.data
  } catch (err) {
    console.error(
      "❌ API Error:",
      err.response?.data || err.message
    )
    throw err
  }
}
