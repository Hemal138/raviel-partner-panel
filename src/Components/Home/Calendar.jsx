import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/* 🔹 helper: get Sunday */
const getSunday = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
};

/* 🔹 date key */
const formatKey = (date) => date.toISOString().split("T")[0];

const Calendar = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState(getSunday(today));
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // 📦 calendar status
  const [uploaded, setUploaded] = useState({});

  // 📁 Excel storage (3 alag)
  const [todayExcel, setTodayExcel] = useState({});
  const [weeklyExcel, setWeeklyExcel] = useState({});
  const [monthlyExcel, setMonthlyExcel] = useState({});
console.log(todayExcel);

  // 🔗 refs
  const todayRef = useRef();
  const weeklyRef = useRef();
  const monthlyRef = useRef();

  /* ⬅️ ➡️ week move */
  const moveLeft = () => {
    const d = new Date(startDate);
    d.setDate(d.getDate() - 7);
    setStartDate(getSunday(d));
  };

  const moveRight = () => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + 7);
    setStartDate(getSunday(d));
  };

  /* 📅 generate week */
  const days = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    const key = formatKey(date);

    let status = "Upcoming";
    let color = "#e0e0e0";

    if (date < today) {
      if (uploaded[key]) {
        status = "Uploaded";
        color = "#2ecc71";
      } else {
        status = "Missed";
        color = "#ff5b8a";
      }
    }

    if (date.getTime() === today.getTime()) {
      status = uploaded[key] ? "Uploaded" : "Today";
      color = uploaded[key] ? "#2ecc71" : "#f9c30a";
    }

    return {
      date,
      day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      number: date.getDate(),
      status,
      color,
      key,
    };
  });

  /* 🪟 popup */
  const handleOpen = (day) => {
    setSelectedDate(day);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
  };

  /* 📤 Excel upload handler */
  const handleExcelUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file || !selectedDate) return;

    const key = selectedDate.key;

    if (type === "today") {
      setTodayExcel((prev) => ({ ...prev, [key]: file }));
    }

    if (type === "weekly") {
      setWeeklyExcel((prev) => ({ ...prev, [key]: file }));
    }

    if (type === "monthly") {
      setMonthlyExcel((prev) => ({ ...prev, [key]: file }));
    }

    setUploaded((prev) => ({ ...prev, [key]: true }));
    handleClose();
  };

  return (
    <Box>
      {/* CALENDAR */}
      <Box
        sx={{
          p: 3,
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          borderRadius: "20px",
          bgcolor: "white",
        }}
      >
        {/* HEADER */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
              {startDate.toLocaleString("default", { month: "long" })}
            </Typography>
            <Typography sx={{ color: "#555" }}>
              {startDate.getFullYear()}
            </Typography>
          </Box>

          <Box>
            <IconButton onClick={moveLeft}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={moveRight}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>

        {/* TIMELINE */}
        <Box sx={{ display: "flex", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "52%",
              left: 0,
              right: 0,
              height: 2,
              bgcolor: "#ddd",
            }}
          />

          {days.map((item, index) => (
            <Box key={index} sx={{ flex: 1, textAlign: "center", zIndex: 1 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 1 }}>
                {item.day}
              </Typography>

              <Box
                onClick={() => handleOpen(item)}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: item.color,
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  boxShadow: "0 6px 14px rgba(0,0,0,0.22)",
                  cursor: "pointer",
                  transition: "0.25s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                {item.number}
              </Box>

              <Typography sx={{ fontSize: 12, mt: 1, color: "#555" }}>
                {item.status}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* POPUP */}
      <Dialog sx={{
        bgcolor:"transparent",
        borderRadius:"200px"
      }} open={open} onClose={handleClose} maxWidth="md" fullWidth>
  {selectedDate && (
    <DialogContent
      sx={{
         bgcolor: "#fff",
          borderRadius: "20px",
          p: 3,
          boxShadow: "0 10px 28px rgba(0,0,0,0.2)",
      }}
    >
      {/* MAIN CARD */}
      <Box
        sx={{
          position: "relative",
        }}
      >
        {/* ❌ Close */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            width: 40,
            height: 40,
            bgcolor: "red",
            color: "#fff",
            fontSize: 22,
            "&:hover": { bgcolor: "#d60000" },
          }}
        >
          ✕
        </IconButton>

        {/* HEADER */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 4 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              bgcolor: "#f5c400",
            }}
          />

          <Box>
            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
              {selectedDate.number} -{" "}
              {selectedDate.date.toLocaleString("default", { month: "long" })} -{" "}
              {selectedDate.date.getFullYear()}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#555" }}>
              {selectedDate.day}
            </Typography>
          </Box>
        </Box>

        {/* HIDDEN INPUTS (unchanged) */}
        <input
          type="file"
          accept=".xls,.xlsx"
          hidden
          ref={todayRef}
          onChange={(e) => handleExcelUpload(e, "today")}
        />
        <input
          type="file"
          accept=".xls,.xlsx"
          hidden
          ref={weeklyRef}
          onChange={(e) => handleExcelUpload(e, "weekly")}
        />
        <input
          type="file"
          accept=".xls,.xlsx"
          hidden
          ref={monthlyRef}
          onChange={(e) => handleExcelUpload(e, "monthly")}
        />

        {/* BUTTONS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => todayRef.current.click()}
            sx={{
              px: 6,
              py: 2,
              borderRadius: "14px",
              fontSize: 16,
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "#b3c6ff",
              color: "#000",
              boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
              "&:hover": { bgcolor: "#9fb6ff" },
            }}
          >
            Daily Excel
          </Button>

          <Button
            onClick={() => weeklyRef.current.click()}
            sx={{
              px: 6,
              py: 2,
              borderRadius: "14px",
              fontSize: 16,
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "#b3c6ff",
              color: "#000",
              boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
              "&:hover": { bgcolor: "#9fb6ff" },
            }}
          >
            Weekly Excel
          </Button>

          <Button
            onClick={() => monthlyRef.current.click()}
            sx={{
              px: 6,
              py: 2,
              borderRadius: "14px",
              fontSize: 16,
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "#b3c6ff",
              color: "#000",
              boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
              "&:hover": { bgcolor: "#9fb6ff" },
            }}
          >
            Monthly Excel
          </Button>
        </Box>
      </Box>
    </DialogContent>
  )}
</Dialog>

    </Box>
  );
};

export default Calendar;
