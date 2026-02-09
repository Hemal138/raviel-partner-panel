import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Avatar,
  Container,
  Backdrop,
  TextField,
  Stack,
} from "@mui/material";
import { Check, RocketLaunch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Form/axiosInstance";
import toast from "react-hot-toast";
import { useUser } from "../../Components/context/UserProvider";

/* 🎨 COLORS */
const COLORS = {
  primary: "#635BFF",
  highlight: "#F8C20A",
  accent: "#FF6692",
  success: "#36C76C",
  dark: "#071B2F",
};

const PLAN_THEMES = [
  { bg: "#DADAFF", accent: "#635BFF" },
  { bg: "#DEFFEB", accent: "#36C76C" },
  { bg: "#FDF5D9", accent: "#F8C20A" },
  { bg: "#FFCCDB", accent: "#FF6692" },
];

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const PartnerCard = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [recurringCount, setRecurringCount] = useState({});

  const { user, refreshUser } = useUser();
  const navigate = useNavigate();

  /* 🟢 BLOCK PAGE IF ACTIVE SUB EXISTS */
  useEffect(() => {
    const subs = user?.payload?.userSubscriptions || [];
    const hasActive = Array.isArray(subs)
      ? subs.some((s) => s.status === "active")
      : subs?.status === "active";

    if (hasActive) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  /* 📦 FETCH PLANS */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get(
          "/subscriptions/fetch-plans?userType=partner&planType=monthly",
          { skipAuth: true }
        );

        const apiPlans = res.data.payload?.partner || [];
        setPlans(
          apiPlans.map((p, i) => ({
            id: p.id,
            name: p.planName,
            description: p.planDescription,
            price: p.price,
            billingCycle: `/${p.planType}`,
            popular: p.isPopular,
            features: p.subscriptionPlanKeyFeatures?.map(
              (f) => f.featureName
            ) || [],
            ...PLAN_THEMES[i % PLAN_THEMES.length],
          }))
        );
      } catch (err) {
        toast.error("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  /* 💳 SUBSCRIBE */
  const handleSubscribe = async (subscriptionPlanId, recurringCount) => {
    try {
      setSubscribing(true);

      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const res = await axiosInstance.post("/subscriptions/create", {
        subscriptionPlanId,
        recurringCount,
      });

      const { key, subscriptionId } = res.data.payload;

      const rzp = new window.Razorpay({
        key,
        subscription_id: subscriptionId,
        name: "Partner Access",
        handler: async () => {
          toast.success("Subscription Activated 🎉");

          /* 🔥 VERY IMPORTANT */
          await refreshUser();

          navigate("/", { replace: true });
        },
      });

      rzp.open();
    } catch (err) {
      toast.error("Subscription failed");
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size={60} sx={{ color: COLORS.primary }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#F8FAFF", minHeight: "100vh" }}>
      <Backdrop open={subscribing} sx={{ zIndex: 1300 }}>
        <CircularProgress />
      </Backdrop>

      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
          gap={4}
        >
          {plans.map((plan) => {
            const count = recurringCount[plan.id];

            return (
              <Card key={plan.id}>
                <CardContent>
                  <Typography fontWeight={800}>{plan.name}</Typography>

                  <Typography fontSize={32} fontWeight={900}>
                    ₹{plan.price}
                  </Typography>

                  <TextField
                    label="Autopay Months"
                    type="number"
                    fullWidth
                    value={count || ""}
                    onChange={(e) =>
                      setRecurringCount({
                        ...recurringCount,
                        [plan.id]: e.target.value,
                      })
                    }
                  />

                  <Button
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={!count}
                    onClick={() => handleSubscribe(plan.id, count)}
                  >
                    Get Started
                  </Button>

                  <Stack mt={2}>
                    {plan.features.map((f, i) => (
                      <Box key={i} display="flex" gap={1}>
                        <Check color="success" />
                        <Typography>{f}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default PartnerCard;
