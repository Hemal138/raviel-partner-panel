import { Container } from "@mui/material";
import React from "react";
import ComingSoon from "../Components/Seller_Partner/ComingSoon";

const Attendance = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1400px", fontFamily: "Inter" }}
      >
        <ComingSoon
          title="Coming Soon"
          subtitle="We're crafting something amazing for you. Our Attendance module is currently under development and will be launching very soon. Stay tuned!"
        />
      </Container>
    </>
  );
};

export default Attendance;
