// import React from "react";
// import { Box } from "@mui/material";
// import Sidebar from "./Sidebar";

// const Layout = ({ children }) => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Sidebar always fixed */}
//       <Sidebar />

//       {/* Main Content always starts below top and beside sidebar */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//         //   ml: { xs: "80px", md: "0px" }, // match sidebar collapsed/expanded
//           p: 3,
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default Layout;

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const SIDEBAR_COLLAPSED = 105;

const Layout = () => {
  return (
    <>
      {/* Sidebar fixed */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
          p: 3,

          // 🔥 KEY FIX
          ml: `${SIDEBAR_COLLAPSED}px`,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;

