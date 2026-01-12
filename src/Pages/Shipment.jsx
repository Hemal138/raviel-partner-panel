import React from "react";
import ShipmentStatus from "../Components/Shipment/ShipmentStatus";
import { Container } from "@mui/material";

const Shipment = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1400px", fontFamily: "Inter" }}
      >
        <ShipmentStatus />
      </Container>
    </>
  );
};

export default Shipment;
