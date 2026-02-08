// import axios from "axios";

// const axiosInstanceForExcel = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   timeout: 10000,
//   headers: {
//     // ❌ Do NOT set Content-Type
//     "ngrok-skip-browser-warning": "true",
//   },
// });

// // 🔐 Attach token only
// axiosInstanceForExcel.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // ⚠️ Do nothing with Content-Type
//     // Axios auto sets multipart/form-data for FormData

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstanceForExcel;


import axios from "axios";

const axiosInstanceForExcel = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 0,
  headers: {
    "Content-Type": "multipart/form-data",
    "ngrok-skip-browser-warning": "true",
  },
});

// 🔐 Attach token (ONLY if skipAuth !== true)
axiosInstanceForExcel.interceptors.request.use(
  (config) => {
    if (config.skipAuth) {
      return config; 
    }

    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Handle 401
axiosInstanceForExcel.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // optional handling
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceForExcel;