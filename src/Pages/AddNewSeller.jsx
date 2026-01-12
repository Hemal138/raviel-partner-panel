import { Container } from "@mui/material";
import React from "react";
import AddSeller from "../Components/AddNewSeller/AddSeller";

const AddNewSeller = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1400px", fontFamily: "Inter" }}
      >
        <AddSeller />
      </Container>
    </>
  );
};

export default AddNewSeller;
