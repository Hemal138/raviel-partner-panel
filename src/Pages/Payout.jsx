import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import axiosInstance from "../Components/Form/axiosInstance";

import SearchFilters from "../Components/Payout/SearchFilters";
import SellerWisePayoutSummary from "../Components/Payout/SellerWisePayoutSummary";
import SellerWisePayout2Table from "../Components/Payout/SellerWisePayout2Table";
import SellerWisePayout from "../Components/Payout/SellerWisePayout";

/* 🔹 Format Month (MM-YYYY) */
const formatMonth = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return `${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
};

const Payout = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payoutRefreshSignal, setPayoutRefreshSignal] = useState(0);

const handleApplyFilters = (filters) => {
  
  const params = {
    sellerId: filters.sellerId || undefined,
    sellerName: filters.sellerName || undefined,
    paymentByMonthYear: convertMonthToAPIFormat(filters.month),
  };
  
  fetchSellers(params);
  filterDataPass(filters)
};

const filterDataPass = (payload, filters) => {

  payload.forEach((item, index) => {
    console.log(item.NMVPaymentMonthYear);
    console.log(filters);
    
  });
};



const convertMonthToAPIFormat = (month) => {
  if (!month) return undefined;

  const [mm, yyyy] = month.split("-");
  return `${yyyy}-${mm}-01`;
};



  /* 🔹 FETCH SELLERS */
const fetchSellers = async (params = {}) => {
  try {
    setLoading(true);

    const res = await axiosInstance.get(
      "/partner/fetch-all-sellers",
      { params }
    );
      const payload = res?.data?.payload || [];
 filterDataPass(payload);
 
    const mapped = (res.data?.payload || []).map((item) => ({
      month: formatMonth(item.launchingDate),
      NMVPaymentDate: formatMonth(item.NMVPaymentMonthYear),
      fixedPaymentDate: formatMonth(item.fixedPaymentMonthYear),

      sellerId: item.id,
      sellerName: item.sellerName,

      fixed: item.fixedPaymentAmount ?? 0,
      nmv: item.NMVPaymentAmount ?? 0,

      fixedPaymentReceivedOrNot: !!item.fixedPaymentReceivedOrNot,
      NMVPaymentReceivedOrNot: !!item.NMVPaymentReceivedOrNot,
    }));

    setRows(mapped);
  } catch (err) {
    console.error("Fetch sellers error:", err);
  } finally {
    setLoading(false);
  }
};


  /* 🔹 Initial Load */
  useEffect(() => {
    fetchSellers();
  }, []);

  /* 🔹 Toggle Handler */
  const handleToggleReceived = async (id, value, paymentType) => {
    try {
      await axiosInstance.put(
        `/partner/confirm-seller-payment/${id}`,
        {
          isPaymentReceivedOrNot: value,
          paymentType,
        }
      );

      // 🔁 Refresh data
      await fetchSellers();

      // 🔥 Refresh payout summary
      setPayoutRefreshSignal((prev) => prev + 1);
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      {/* 🔹 TOP SUMMARY */}
      <SellerWisePayout payoutRefreshSignal={payoutRefreshSignal} />

      {/* 🔹 FILTER UI (logic not attached yet) */}
      <SearchFilters onApply={handleApplyFilters} />


      {/* 🔹 FIXED PAYOUT TABLE */}
      <SellerWisePayoutSummary
        rows={rows}
        loading={loading}
        onToggle={handleToggleReceived}
      />

      {/* 🔹 NMV PAYOUT TABLE */}
      <SellerWisePayout2Table
        rows={rows}
        loading={loading}
        onToggle={handleToggleReceived}
      />
    </Container>
  );
};

export default Payout;
