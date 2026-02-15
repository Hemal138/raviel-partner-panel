import React from 'react'
import { Container } from '@mui/material'
import PaymentType from '../Components/download/PaymentType'

const Download = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1400px",
          fontFamily: "Inter",
          pb: 6,
          overflowX: "hidden",
        }}
      >
        <PaymentType/>
      </Container>
    </>
  )
}

export default Download
