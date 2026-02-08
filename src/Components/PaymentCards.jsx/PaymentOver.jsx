import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useNavigate } from "react-router-dom";

const PaymentOver = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "98vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: "24px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          background: "linear-gradient(135deg, #DADAFF, #FDF5D9)",
        }}
      >
        <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: "center" }}>
          {/* ICON */}
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              bgcolor: "#DEFFEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 50, color: "#36C76C" }} />
          </Box>

          {/* TITLE */}
          <Typography
            fontSize={28}
            fontWeight={800}
            sx={{ color: "#071B2F", mb: 1 }}
          >
            Your Payment Is Completed
          </Typography>

          {/* SUBTITLE */}
          <Typography
            fontSize={15}
            sx={{ color: "#071B2F", opacity: 0.8, mb: 4 }}
          >
            Thank you for using our premium services.  
            Your previous subscription cycle has been successfully completed.
          </Typography>

          {/* INFO BOX */}
          <Box
            sx={{
              p: 3,
              borderRadius: "18px",
              bgcolor: "#FDF5D9",
              border: "1px solid #F8C20A",
              mb: 4,
            }}
          >
            <Typography
              fontSize={14}
              sx={{ color: "#071B2F", lineHeight: 1.7 }}
            >
              To continue enjoying uninterrupted access to all premium features,
              we recommend upgrading your plan again.
              <br />
              <b>Your data remains safe and active.</b>
            </Typography>
          </Box>

          {/* CTA */}
          <Button
            onClick={() => navigate("/request-plan")}
            startIcon={<WorkspacePremiumIcon />}
            sx={{
              px: 5,
              py: 1.6,
              borderRadius: "14px",
              fontSize: 15,
              fontWeight: 700,
              textTransform: "none",
              bgcolor: "#635BFF",
              color: "#fff",
              "&:hover": {
                bgcolor: "#4A43D6",
              },
            }}
          >
            Upgrade to Premium Again
          </Button>

          {/* SECONDARY */}
          <Box sx={{ mt: 3 }}>
            <Typography fontSize={13} sx={{ color: "#071B2F", opacity: 0.7 }}>
              Need help or have questions?
            </Typography>
            <Typography
              fontSize={13}
              sx={{
                color: "#635BFF",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Contact Support
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentOver;
