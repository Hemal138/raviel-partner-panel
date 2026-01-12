import { Box, Button, TextField, Paper } from "@mui/material"
import React, { useState } from "react"

const UseAddForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: ""
  })

  const [errors, setErrors] = useState({})

  // ================= Handle Change =================
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  // ================= Validation =================
  const validate = () => {
    let temp = {}

    if (!values.name.trim())
      temp.name = "Seller name is required"

    if (!values.email)
      temp.email = "Email is required"
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    )
      temp.email = "Enter a valid email"

    if (!values.phone)
      temp.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(values.phone))
      temp.phone = "Enter 10 digit phone number"

    if (!values.city.trim())
      temp.city = "City is required"

    if (!values.address.trim())
      temp.address = "Address is required"

    setErrors(temp)

    return Object.keys(temp).length === 0
  }

  // ================= Submit =================
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      console.log("Form Data :", values)
      // 👉 API call here
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "#F4F6FF"
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2
        }}
      >
        <TextField
          label="Seller Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />

        <TextField
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />

        <TextField
          label="Phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
        />

        <TextField
          label="City"
          name="city"
          value={values.city}
          onChange={handleChange}
          error={!!errors.city}
          helperText={errors.city}
          fullWidth
        />

        <TextField
          label="Address"
          name="address"
          value={values.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
          multiline
          rows={3}
          sx={{ gridColumn: "span 2" }}
          fullWidth
        />

        <Button
          type="submit"
          sx={{
            gridColumn: "span 2",
            mt: 2,
            py: 1.5,
            borderRadius: 2,
            background: "#36C76C",
            fontWeight: 600,
            color: "#000",
            "&:hover": {
              background: "#2faa5c"
            }
          }}
        >
          Add Seller
        </Button>
      </Box>
    </Paper>
  )
}

export default UseAddForm
