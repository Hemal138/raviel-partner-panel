import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const SellerDeskCodVsPrepaid = ({ seller }) => {
    
    const totalGMV = Number(seller?.totalGMV ?? 0);

    const codPercentage = Number(seller?.CODOrdersPercentage ?? 0);
    const prepaidPercentage = Number(seller?.prepaidOrdersPercentage ?? 0);

    const { codValue, prepaidValue } = useMemo(() => {
        return {
            codValue: (codPercentage * totalGMV) / 100,
            prepaidValue: (prepaidPercentage * totalGMV) / 100,
        };
    }, [codPercentage, prepaidPercentage, totalGMV]);

    return (
        <Box
            sx={{
                borderRadius: "18px",
                p: 3,
                bgcolor: "#fff",
                height: "100%",
                textAlign: "center",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            }}
        >
            <Typography color="text.secondary" fontSize={14}>
                Statistics
            </Typography>

            <Typography variant="h6" fontWeight={700} mb={2}>
                COD VS PREPAID
            </Typography>

            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: codValue, label: "COD" },
                            { id: 1, value: prepaidValue, label: "Prepaid" },
                        ],
                        innerRadius: 70,
                        outerRadius: 90,
                        cornerRadius: 6,
                    },
                ]}
                width={280}
                height={280}
            />

            <Typography color="text.secondary">Total GMV</Typography>
            <Typography fontWeight={700} fontSize={18}>
                ₹{totalGMV.toLocaleString()}
            </Typography>

            <Box
                mt={2}
                display="flex"
                justifyContent="center"
                gap={3}
                fontSize={14}
            >
                <Typography>● COD {codPercentage}%</Typography>
                <Typography>● Prepaid {prepaidPercentage}%</Typography>
            </Box>
        </Box>
    );
};

export default SellerDeskCodVsPrepaid;
