import { Box, Typography, Paper } from "@mui/material"
import React, { useEffect, useState } from "react"
import { getUserProfile } from "./userApi"

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        console.log("📦 PROFILE DATA:", data)
        setUser(data.user)
      })
      .catch((err) => {
        console.log("🚫 Unauthorized or token expired", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading)
    return <Typography>Loading...</Typography>

  if (!user)
    return <Typography>No user data</Typography>

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: 3,
        background: "#F4F6FF"
      }}
    >
      <Typography variant="h6" mb={2}>
        Profile
      </Typography>

      <Typography>
        <b>Name:</b> {user.name}
      </Typography>

      <Typography>
        <b>Email:</b> {user.email}
      </Typography>

      <Typography>
        <b>Phone:</b> {user.phone}
      </Typography>
    </Paper>
  )
}

export default Profile
