import { Box, Typography } from '@mui/material'
import React from 'react'

const SellerWisePayout = () => {

  let Total_Fixed_Payment = 2000;
  let Total_NMV_Payment = 3000;
  let Final_Payout = 20000

  return (
    <>
       <Box>
        <Box sx={{display:"flex",alignItems:"center"}}>
          <Box sx={{height:"30px",width:"30px",borderRadius:"50%",bgcolor:"#36C76C"}}></Box>
          <Box sx={{paddingLeft:"20px", fontSize:"22px",fontWeight:"bold"}}>Seller Wise Payout</Box>
        </Box>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",pt:3}}>
          <Box sx={{width:"30%",bgcolor:"#FFCCDB",height:"100%",borderRadius:"20px",padding:"25px",boxShadow: "0 4px 14px rgba(0,0,0,0.08)"}}>
            <Typography sx={{fontSize:"18px",paddingBottom:"7px"}}>Total Fixed Payment</Typography>
            <Box sx={{fontSize:"25px",fontWeight:"bold"}}>₹{Total_Fixed_Payment}</Box>
          </Box>
          <Box sx={{width:"30%",bgcolor:"#DADAFF",height:"100%",borderRadius:"20px",padding:"25px",boxShadow: "0 4px 14px rgba(0,0,0,0.08)"}}>
            <Typography sx={{fontSize:"18px",paddingBottom:"7px"}}>Total NMV Payment</Typography>
            <Box sx={{fontSize:"25px",fontWeight:"bold"}}>₹{Total_NMV_Payment}</Box>
          </Box>
          <Box sx={{width:"30%",bgcolor:"#DEFFEB",height:"100%",borderRadius:"20px",padding:"25px",boxShadow: "0 4px 14px rgba(0,0,0,0.08)"}}>
            <Typography sx={{fontSize:"18px",paddingBottom:"7px"}}>Final Payout</Typography>
            <Box sx={{fontSize:"25px",fontWeight:"bold"}}>₹{Final_Payout}</Box>
          </Box>
        </Box>
       </Box>
    </>
  )
}

export default SellerWisePayout
