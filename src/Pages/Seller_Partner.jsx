import React from "react";
import ComingSoon from "../Components/Seller_Partner/ComingSoon";
import { Container } from "@mui/material";

const Seller_Partner = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1400px", fontFamily: "Inter" }}
      >
        <ComingSoon
          title="Coming Soon"
          subtitle="We're crafting something amazing for you. Our Seller Partner module is currently under development and will be launching very soon. Stay tuned!"
        />
      </Container>
    </>
  );
};

export default Seller_Partner;
