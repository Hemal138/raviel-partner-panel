import React from "react";
import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import SellerDetails from "../Components/Seller_Desk/SellerDetail";

/* 🔹 Dummy seller list (API ready) */
const SELLERS = [
  {
    sellerId: "XZY058",
    name: "Hemal Creation",
    email: "hemal@gmail.com",
    launchDate: "12-12-2025",
  },
  {
    sellerId: "XKHY08",
    name: "Khushal Satani",
    email: "khushalsatani007@gmail.com",
    launchDate: "12-12-2025",
  },
  {
    sellerId: "KHU005",
    name: "Jayesh Bhayani",
    email: "jayesh@gmail.com",
    launchDate: "12-12-2025",
  },
];

const Seller_Desk = () => {
  const { sellerId } = useParams();

  const sellerData = SELLERS.find(
    (seller) => seller.sellerId === sellerId
  );

  if (!sellerData) {
    return (
      <Container>
        <Typography fontWeight={600}>Seller not found</Typography>
      </Container>
    );
  }

  return (
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1400px", fontFamily: "Inter", }}
      >
      <SellerDetails seller={sellerData} />
    </Container>
  );
};

export default Seller_Desk;
