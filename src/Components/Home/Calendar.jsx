import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../Form/axiosInstance";
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
import toast from "react-hot-toast";
import axiosInstanceForExcel from "../AddNewSeller/axiosInstanceForExcel";

/* ================= HELPERS ================= */

const STATUS_COLOR = {
  uploaded: "#2ecc71",
  pending: "#f9c30a",
  missed: "#ff5b8a",
  none: "#e0e0e0",
};

const getSunday = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
};

const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getWeekOfMonth = (startDate) => {
  const date = new Date(startDate);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const week = Math.ceil((date.getDate() + firstDay) / 7);
  return Math.min(week, 4);
};

const getDominantMonth = (startDate) => {
  const count = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const m = d.toLocaleString("default", { month: "long" });
    count[m] = (count[m] || 0) + 1;
  }
  return Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
};

/* ================= COMPONENT ================= */

const Calendar = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState(getSunday(today));
  const [dayStatus, setDayStatus] = useState({});
  const [weekTopStatus, setWeekTopStatus] = useState("none");
  const [monthTopStatus, setMonthTopStatus] = useState("none");

  const [monthCache, setMonthCache] = useState({});
  const [weekNumber, setWeekNumber] = useState(getWeekOfMonth(startDate));
  const [displayMonth, setDisplayMonth] = useState(getDominantMonth(startDate));

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [uploadContext, setUploadContext] = useState(null); // daily | weekly | monthly
  const [uploadError, setUploadError] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const isUploaded = (status) => status === "uploaded";

  const dailyRef = useRef(null);
  const weeklyRef = useRef(null);
  const monthlyRef = useRef(null);

  const getWeekRangeForUpload = (start) => {
  const from = new Date(start);
  const to = new Date(start);
  to.setDate(from.getDate() + 6);

  return {
    dateRangeFromWeeklyOrMonthly: formatDate(from),
    dateRangeToWeeklyOrMonthly: formatDate(to),
  };
};



  useEffect(() => {
    const monthKey = `${startDate.getFullYear()}-${startDate.getMonth()}`;

    if (!monthCache[monthKey]) {
      setMonthTopStatus("none");
    }
  }, [startDate]);

  /* ================= API ================= */

  const getWeekRange = (start) => {
    const s = new Date(start);
    const e = new Date(start);
    e.setDate(s.getDate() + 6);
    return { fromDate: formatDate(s), toDate: formatDate(e) };
  };

  const fetchWeekStatus = async (fromDate, toDate) => {
    try {
      const res = await axiosInstance.get(
        "/partner/file-placeholders",
        { params: { fromDate, toDate } }
      );

      const payload = res?.data?.payload || {};

      const dayMap = {};
      let weekStatus = "none";
      let monthStatus = "none";

      const allWeekly = [];
      const allMonthly = [];

      Object.entries(payload).forEach(([date, records]) => {
        /* ================= DAILY ================= */
        const dailyRecords = records.filter(r => r.fileType === "daily");

        if (dailyRecords.length === 0) {
          dayMap[date] = "none";
        } else if (dailyRecords.some(r => r.status === "uploaded")) {
          dayMap[date] = "uploaded";
        } else if (dailyRecords.some(r => r.status === "pending")) {
          dayMap[date] = "pending";
        } else {
          dayMap[date] = "missed";
        }

        /* collect weekly & monthly */
        allWeekly.push(...records.filter(r => r.fileType === "weekly"));
        allMonthly.push(...records.filter(r => r.fileType === "monthly"));
      });

      /* ================= WEEKLY ================= */
      if (allWeekly.length === 0) {
        weekStatus = "none";
      }
      else if (allWeekly.some(r => r.status === "uploaded")) {
        weekStatus = "uploaded";
      }
      else if (allWeekly.some(r => r.status === "pending")) {
        weekStatus = "pending";
      }
      else {
        weekStatus = "missed";
      }


      /* ================= MONTHLY ================= */
      const currentMonth = startDate.getMonth();
      const currentYear = startDate.getFullYear();


      const currentMonthKey = `${startDate.getFullYear()}-${startDate.getMonth()}`;

      if (monthCache[currentMonthKey]) {
        monthStatus = monthCache[currentMonthKey];
      } else {
        let calculatedMonthStatus = "none";

        if (allMonthly.some(r => r.status === "uploaded")) {
          calculatedMonthStatus = "uploaded";
        } else if (allMonthly.some(r => r.status === "pending")) {
          calculatedMonthStatus = "pending";
        } else if (allMonthly.some(r => r.status === "missed")) {
          calculatedMonthStatus = "missed";
        }

        setMonthCache(prev => ({
          ...prev,
          [currentMonthKey]: calculatedMonthStatus,
        }));

        monthStatus = calculatedMonthStatus;
      }



      /* ================= SET STATES ================= */
      setDayStatus(dayMap);          // 👈 niche calendar
      setWeekTopStatus(weekStatus);  // 👈 top right (Week)
      setMonthTopStatus(monthStatus); // 👈 top left (Month)

    } catch (err) {
      toast.error("Failed to fetch calendar data");
    }
  };



  useEffect(() => {
    const { fromDate, toDate } = getWeekRange(startDate);
    fetchWeekStatus(fromDate, toDate);
    setWeekNumber(getWeekOfMonth(startDate));
    setDisplayMonth(getDominantMonth(startDate));
  }, [startDate]);

  /* ================= NAV ================= */

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

  /* ================= DAYS ================= */

  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const key = formatDate(date);

    let status = dayStatus[key] || "none";
    let color = STATUS_COLOR[status];

    return {
      date,
      number: date.getDate(),
      day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      status,
      color,
    };
  });

  /* ================= OPEN HANDLERS ================= */

  const openDaily = (day) => {
    setSelectedDate(day);
    setUploadContext("daily");
    setOpen(true);
    setUploadError("");
  };

  const openWeekly = () => {
    setSelectedDate({ date: startDate });
    setUploadContext("weekly");
    setOpen(true);
    setUploadError("");
  };

  const openMonthly = () => {
    setSelectedDate({ date: startDate });
    setUploadContext("monthly");
    setOpen(true);
    setUploadError("");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
    setUploadContext(null);
    setSelectedFileName("");
  };


  /* ================= UPLOAD ================= */

const uploadToBackend = async (file, category, uploadDate, rangeData) => {
  const fd = new FormData();

  fd.append("timeline-data-management-file", file);
  fd.append("timelineDataTenure", category);

  // ✅ DAILY → uploadDate
  if (category === "daily") {
    fd.append("uploadDate", uploadDate);
  }

  // ✅ WEEKLY & MONTHLY → range
  if (category === "weekly" || category === "monthly") {
    fd.append(
      "dateRangeFromWeeklyOrMonthly",
      rangeData.dateRangeFromWeeklyOrMonthly
    );
    fd.append(
      "dateRangeToWeeklyOrMonthly",
      rangeData.dateRangeToWeeklyOrMonthly
    );
  }

  return axiosInstanceForExcel.post(
    "/partner/timeline-data-management",
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};



 const handleExcelUpload = async (e, category) => {
  const file = e.target.files[0];
  if (!file || !selectedDate) return;

  const ext = file.name.split(".").pop();
  setSelectedFileName(file.name);

  // 🔹 DAILY
  const uploadDate = formatDate(selectedDate.date);

  // 🔹 WEEKLY / MONTHLY range
  const rangeData =
    category === "weekly" || category === "monthly"
      ? getWeekRangeForUpload(startDate)
      : null;

  try {
    const res = await uploadToBackend(
      new File(
        [file],
        `${category}_${uploadDate}.${ext}`,
        { type: file.type }
      ),
      category,
      uploadDate,
      rangeData
    );

toast.success(res?.data?.message || "Excel uploaded successfully");

/* 🔥 INSTANT UI UPDATE */
if (category === "monthly") {
  const monthKey = `${startDate.getFullYear()}-${startDate.getMonth()}`;

  setMonthCache(prev => ({
    ...prev,
    [monthKey]: "uploaded",
  }));

  setMonthTopStatus("uploaded");
}

if (category === "weekly") {
  setWeekTopStatus("uploaded");
}

if (category === "daily") {
  const dayKey = formatDate(selectedDate.date);
  setDayStatus(prev => ({
    ...prev,
    [dayKey]: "uploaded",
  }));
}

/* OPTIONAL: background sync */
const { fromDate, toDate } = getWeekRange(startDate);
fetchWeekStatus(fromDate, toDate);

handleClose();


  } catch (err) {
    const msg = err?.response?.data?.message || "Upload failed";
    toast.error(msg);
    setUploadError(msg);
  } finally {
    e.target.value = "";
  }
};

  const uploadBtnStyle = (bg, hoverBg) => ({
    px: 5,
    py: 1.8,
    bgcolor: bg,
    color: "#fff",
    borderRadius: "14px",
    textTransform: "none",
    fontWeight: 600,
    fontSize: 15,
    "&:hover": { bgcolor: hoverBg },
  });


  /* ================= UI ================= */

  return (
    <Box>
      <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 3, boxShadow: 3 }}>
        {/* HEADER */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography fontSize={20} fontWeight={700}>{displayMonth}</Typography>
            <Typography color="#666">{startDate.getFullYear()}</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 6 }}>
            {/* MONTH */}
            <Box
              sx={{
                textAlign: "center",
                cursor: monthTopStatus === "uploaded" ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (monthTopStatus === "uploaded") return;
                openMonthly();
              }}
            >
              <Typography fontSize={12}>{displayMonth}</Typography>

              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: STATUS_COLOR[monthTopStatus],
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {new Date(startDate).getMonth() + 1}
              </Box>

              <Typography fontSize={12}>{monthTopStatus}</Typography>
            </Box>


            {/* WEEK */}
            <Box
              sx={{
                textAlign: "center",
                cursor: weekTopStatus === "uploaded" ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (weekTopStatus === "uploaded") return;
                openWeekly();
              }}
            >
              <Typography fontSize={12}>Week</Typography>

              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: STATUS_COLOR[weekTopStatus],
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {weekNumber}
              </Box>

              <Typography fontSize={12}>{weekTopStatus}</Typography>
            </Box>

          </Box>

          <Box>
            <IconButton onClick={moveLeft}><ChevronLeftIcon /></IconButton>
            <IconButton onClick={moveRight}><ChevronRightIcon /></IconButton>
          </Box>
        </Box>

        {/* DAYS */}
        <Box sx={{ display: "flex", position: "relative" }}>
          <Box sx={{ position: "absolute", top: "52%", left: 0, right: 0, height: 2, bgcolor: "#ddd" }} />
          {days.map((d, i) => (
            <Box key={i} sx={{ flex: 1, textAlign: "center", zIndex: 1 }}>
              <Typography fontSize={12}>{d.day}</Typography>
              <Box
                onClick={() => {
                  if (isUploaded(d.status)) return;
                  openDaily(d);
                }}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: d.color,
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  cursor: isUploaded(d.status) ? "not-allowed" : "pointer",
                  boxShadow: 3,
                }}
              >
                {d.number}
              </Box>

              <Typography fontSize={12}>{d.status}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* POPUP */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"          // ⬅️ wider than sm
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            minHeight: "auto", // ⬅️ height increase
            boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
          },
        }}
      >
        <DialogContent sx={{ p: 4 }}>
          {/* HIDDEN INPUTS */}
          <input hidden ref={dailyRef} type="file" accept=".xls,.xlsx"
            onChange={(e) => handleExcelUpload(e, "daily")} />
          <input hidden ref={weeklyRef} type="file" accept=".xls,.xlsx"
            onChange={(e) => handleExcelUpload(e, "weekly")} />
          <input hidden ref={monthlyRef} type="file" accept=".xls,.xlsx"
            onChange={(e) => handleExcelUpload(e, "monthly")} />

          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            {/* ================= DAILY ================= */}
            {uploadContext === "daily" && (
              <Button
                disabled={
                  dayStatus[formatDate(selectedDate?.date)] === "uploaded"
                }
                onClick={() => dailyRef.current.click()}
                sx={{
                  ...uploadBtnStyle("#1976d2", "#115293"),
                  opacity:
                    dayStatus[formatDate(selectedDate?.date)] === "uploaded" ? 0.6 : 1,
                  cursor:
                    dayStatus[formatDate(selectedDate?.date)] === "uploaded"
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {dayStatus[formatDate(selectedDate?.date)] === "uploaded"
                  ? "Daily File Already Uploaded"
                  : "Select Daily Excel File"}
              </Button>
            )}

            {/* ================= WEEKLY ================= */}
            {uploadContext === "weekly" && (
              <Button
                disabled={weekTopStatus === "uploaded"}
                onClick={() => weeklyRef.current.click()}
                sx={{
                  ...uploadBtnStyle("#9c27b0", "#6a1b9a"),
                  opacity: weekTopStatus === "uploaded" ? 0.6 : 1,
                  cursor: weekTopStatus === "uploaded" ? "not-allowed" : "pointer",
                }}
              >
                {weekTopStatus === "uploaded"
                  ? "Weekly File Already Uploaded"
                  : "Select Weekly Excel File"}
              </Button>
            )}

            {/* ================= MONTHLY ================= */}
            {uploadContext === "monthly" && (
              <Button
                disabled={monthTopStatus === "uploaded"}
                onClick={() => monthlyRef.current.click()}
                sx={{
                  ...uploadBtnStyle("#2ecc71", "#27ae60"),
                  opacity: monthTopStatus === "uploaded" ? 0.6 : 1,
                  cursor: monthTopStatus === "uploaded" ? "not-allowed" : "pointer",
                }}
              >
                {monthTopStatus === "uploaded"
                  ? "Monthly File Already Uploaded"
                  : "Select Monthly Excel File"}
              </Button>
            )}

          </Box>

          {/* ERROR */}
          {uploadError && (
            <Typography
              color="error"
              mt={2}
              textAlign="center"
              fontSize={14}
              fontWeight={500}
            >
              There is an issue with your file: {uploadError}
            </Typography>
          )}

          {/* FINAL NOTICE */}
          <Box
            sx={{
              mt: 4,
              p: 2,
              borderRadius: "14px",
              backgroundColor: "#FFF8E1",
              border: "1px solid #FFE082",
              display: "flex",
              gap: 1.5,
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ fontSize: 20, lineHeight: "20px" }}>⚠️</Box>

            <Typography fontSize={13} sx={{ color: "#6B5E00", lineHeight: 1.6 }}>
              <b>Important Notice:</b> This Excel upload is a final action.
              Once the file is uploaded, it cannot be edited, replaced, or undone.
              Please ensure you are uploading the correct and final version of the file.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>


    </Box>
  );
};

export default Calendar;
