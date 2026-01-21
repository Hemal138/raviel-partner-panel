import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import axiosInstance from "../Components/Form/axiosInstance";
import SearchFilters from "../Components/Payout/SearchFilters";
import SellerWisePayoutSummary from "../Components/Payout/SellerWisePayoutSummary";
import SellerWisePayout2Table from "../Components/Payout/SellerWisePayout2Table";

const formatMonth = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return `${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
};

const Payout = () => {
  const [allRows, setAllRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [month, setMonth] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/partner/fetch-all-sellers");

        const mapped = (res.data?.payload || []).map((item) => ({
          month: formatMonth(item.launchingDate),
          sellerId: item.sellerId,
          sellerName: item.sellerName,
          fixed: item.fixedPaymentAmount ?? 0,
          nmv: item.NMVPaymentAmount ?? 0,
          received: !!item.fixedPaymentReceivedOrNot,
        }));

        setAllRows(mapped);
        setFilteredRows(mapped);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const handleApply = () => {
    setFilteredRows(
      allRows.filter(
        (row) =>
          (!month || row.month === month) &&
          (!sellerId || row.sellerId.includes(sellerId)) &&
          (!sellerName || row.sellerName.includes(sellerName))
      )
    );
  };

  // ✅ TOGGLE API HANDLER
  const handleToggleReceived = async (sellerId, value) => {
    await axiosInstance.post(
      `/partner/confirm-seller-payment/${sellerId}`,
      { isPaymentReceivedOrNot: value }
    );

    setAllRows((prev) =>
      prev.map((r) =>
        r.sellerId === sellerId ? { ...r, received: value } : r
      )
    );

    setFilteredRows((prev) =>
      prev.map((r) =>
        r.sellerId === sellerId ? { ...r, received: value } : r
      )
    );
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <SearchFilters
        month={month}
        setMonth={setMonth}
        sellerId={sellerId}
        setSellerId={setSellerId}
        sellerName={sellerName}
        setSellerName={setSellerName}
        onApply={handleApply}
      />

      <SellerWisePayoutSummary
        rows={filteredRows}
        loading={loading}
        onToggle={handleToggleReceived}
      />

      <SellerWisePayout2Table
        rows={filteredRows}
        loading={loading}
        onToggle={handleToggleReceived}
      />

    </Container>
  );
};

export default Payout;
