import React, { useEffect } from "react";
import "./dashboard.css";
import { Box, Grid, Typography } from "@mui/material";
import Steps from "../../components/stepper/stepper";

const Dashboard = () => {

  const steps = [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',
    'Create an ad',
  ];
  const studentDetails = {
    id: "1234567",
    loan_duration: "3 years",
    profile_status: "Live/Expired",
    loan_amount: "10000 USD",
    reward_status: "Not initialted",
    recived_rewards: "100 USD",
    payment_status: "On",
    repaid_amount: "2500 USD",
    remaining_amount: "8500 USD",
  };
  
  // const navigate = useNavigate();

  // const register = () => {
  //     navigate("/register")
  // }
  // const dashboard = () => {
  //     navigate("/dashboard");
  // }

  useEffect(() => {
    console.log("hsidfbwei");
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={5} bgcolor={"#D9D9D9"} mt={5} mx={2} py={2}>
        <Box>
          <Typography fontSize={18} py={1}>Student Id: {studentDetails.id}</Typography>
          <Typography fontSize={18} py={1}>Loan Duration: {studentDetails.loan_duration}</Typography>
          <Typography fontSize={18} py={1}>Profile Status: {studentDetails.profile_status}</Typography>
          <Typography fontSize={18} py={1}>Loan Released Amount: {studentDetails.loan_amount}</Typography>
          <Typography fontSize={18} py={1}>Reward Status: {studentDetails.reward_status}</Typography>
          <Typography fontSize={18} py={1}>Reward Recived: {studentDetails.recived_rewards}</Typography>
          <Typography fontSize={18} py={1}>Payment Status: {studentDetails.payment_status}</Typography>
          <Typography fontSize={18} py={1}>Repaid Amount: {studentDetails.repaid_amount}</Typography>
          <Typography fontSize={18} py={1}>Remainin Amount: {studentDetails.remaining_amount}</Typography>
        </Box>
      </Grid>
      <Grid item xs={8} lg={8} md={8} sm={8} mt={5}>
        <Steps steps={steps} activeStep={4}/>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
