import React from "react";
import MysellerTable from "../Components/My_Seller/MysellerTable";
import { Container } from "@mui/material";

const MySeller = () => {
  
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1400px", fontFamily: "Inter" }}
      >
        <MysellerTable />
      </Container>
    </>
  );
};

export default MySeller;
