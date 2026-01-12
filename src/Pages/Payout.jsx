import React from "react";
import SellerWisePayout from "../Components/Payout/SellerWisePayout";
import { Container } from "@mui/material";
import SellerWisePayoutSummary from "../Components/Payout/SellerWisePayoutSummary";
import SearchFilters from "../Components/Payout/SearchFilters";

const Payout = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1400px", fontFamily: "Inter" }}
      >
        <SellerWisePayout />
        <SellerWisePayoutSummary/>
      </Container>
    </>
  );
};

export default Payout;
