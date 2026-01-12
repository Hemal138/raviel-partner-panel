import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BoltIcon from '@mui/icons-material/Bolt';

const ComingSoon = ({ title = "Coming Soon", subtitle }) => {
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    {
      icon: <RocketLaunchIcon/>,
      title: "Lightning Fast",
      desc: "Optimized for speed",
      color: "#635BFF",
      bg: "#DADAFF",
    },
    {
      icon: <AutoAwesomeIcon/>,
      title: "Beautiful Design",
      desc: "Stunning interface",
      color: "#FF6692",
      bg: "#FFCCDB",
    },
    {
      icon: <BoltIcon/>,
      title: "Powerful Features",
      desc: "Everything you need",
      color: "#36C76C",
      bg: "#DEFFEB",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "90vh",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23635BFF'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Box sx={{ zIndex: 1, maxWidth: 1000, width: "100%", textAlign: "center" }}>
        {/* Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#DADAFF",
            color: "#635BFF",
            px: 3,
            py: 1,
            borderRadius: "50px",
            fontWeight: 600,
            fontSize: 14,
            mb: 3,
            border: "2px solid #635BFF",
          }}
        >
          <Box component="span">✦</Box>
          Under Construction
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            mb: 2,
            background:
              "linear-gradient(135deg, #635BFF 0%, #FF6692 50%, #F8C20A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#071B2F",
            opacity: 0.7,
            maxWidth: 600,
            mx: "auto",
            mb: 6,
          }}
        >
          {subtitle ||
            "We're crafting something amazing for you. This feature is currently in development and will be launching very soon. Stay tuned!"}
        </Typography>

        {/* Feature Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 3,
            maxWidth: 900,
            mx: "auto",
            mb: 6,
          }}
        >
          {features.map((f, i) => (
            <Box
              key={i}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                p: 4,
                border: `2px solid ${f.color}`,
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform:
                  activeCard === i ? "translateY(-8px)" : "translateY(0)",
                boxShadow:
                  activeCard === i
                    ? `0 12px 40px ${f.color}30`
                    : `0 4px 20px ${f.color}15`,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: f.bg,
                  color: f.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  mx: "auto",
                  mb: 2,
                }}
              >
                {f.icon}
              </Box>

              <Typography fontWeight={700} fontSize={18} mb={1}>
                {f.title}
              </Typography>

              <Typography fontSize={14} color="#071B2F" opacity={0.6}>
                {f.desc}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            sx={{
              px: 5,
              py: 1.8,
              borderRadius: 2,
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
              background:
                "linear-gradient(135deg, #635BFF 0%, #FF6692 100%)",
              boxShadow: "0 4px 20px rgba(99,91,255,0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(99,91,255,0.4)",
              },
            }}
            onClick={() => (window.location.href = "/dashboard")}
          >
            Back to Dashboard
          </Button>

          <Button
            sx={{
              px: 5,
              py: 1.8,
              borderRadius: 2,
              fontSize: 16,
              fontWeight: 600,
              bgcolor: "#fff",
              color: "#635BFF",
              border: "2px solid #635BFF",
              "&:hover": {
                bgcolor: "#635BFF",
                color: "#fff",
              },
            }}
            onClick={() => alert("Notify feature coming soon!")}
          >
            Notify Me
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ComingSoon;
