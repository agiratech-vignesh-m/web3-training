
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Box, Grid, Typography } from "@mui/material";
import Steps from "../../components/stepper/stepper";
import { dashboardData1Setup, dashboardMilestoneSetup } from "../../integration/web3Client";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Dashboard = () => {
    const steps = [
      'Student onBoarded',
      'L1 Approved',
      'L2 Approved',
      'Loan Sanctioned',
    ];

    const[details, setsDetails] = useState();
    const studentid = localStorage.getItem("studentId");
    const[active, setActive] = useState(0);

    useEffect(() => {
      studentDetails();
      studentMilstone();
    },[]);

    
    const studentDetails = async () => {
      let details = await dashboardData1Setup("metamask", studentid);
      console.log("Details of student",details)
      setsDetails(details);
    }

    const studentMilstone = async () => {
      let mDetails = await dashboardMilestoneSetup("metamask", studentid);
      console.log("Milestone-Details of student",mDetails)
      setActive(mDetails);
    }

    return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student Info</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" >
                  Student Id:
                </StyledTableCell>
                <StyledTableCell align="right"> {studentid} </StyledTableCell>
                
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" >
                  Loan Duration:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.loanDuration} months</StyledTableCell>
                
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" >
                    Profile Status:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.profileStatus} </StyledTableCell>
                
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" >
                    Loan Released Amount:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.loanReleasedAmount} </StyledTableCell>
                
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" >
                    Reward Status:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.rewardStatus} </StyledTableCell>
                
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" >
                    Reward Received:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.rewardAmountReceived} </StyledTableCell>
                
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" >
                    Re-Payment Status:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.repaymentStatus} </StyledTableCell>
                
              </StyledTableRow>
              {/* <StyledTableRow>
                <StyledTableCell component="th" >
                    Repaid Amount:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.repaidAmount} </StyledTableCell>
                
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" >
                    Remaining Amount:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.remainingAmount} </StyledTableCell>
                
              </StyledTableRow> */}
              <StyledTableRow>
                <StyledTableCell component="th" >
                Principal Plus Interest:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.principalPlusInterest} </StyledTableCell>
                
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" >
                    Remaining Installments:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.remainingInstallmentMonths} months</StyledTableCell>
                
              </StyledTableRow>
          
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={12} lg={12} md={12} sm={12} mt={12} style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Steps steps={steps} activeStep={active} />
      </Grid>
      </Box>
    );
  }
  //   <Grid container spacing={2}>
  //     <Grid item xs={12} mt={12} mx={2} py={2} style={{
  //       display: "flex",
  //       justifyContent: "center"
  //     }}>
  //       <Box width={"50%"} bgcolor={"#D9D9D9"} padding={2}>
  //         <Typography fontSize={18} py={1}>Student Id: {studentDetails.studentGeneratedID}</Typography>
  //         <Typography fontSize={18} py={1}>Loan Duration: {studentDetails.loan_duration}</Typography>
  //         <Typography fontSize={18} py={1}>Profile Status: {studentDetails.profile_status}</Typography>
  //         <Typography fontSize={18} py={1}>Loan Released Amount: {studentDetails.loan_amount}</Typography>
  //         <Typography fontSize={18} py={1}>Reward Status: {studentDetails.reward_status}</Typography>
  //         <Typography fontSize={18} py={1}>Reward Recived: {studentDetails.recived_rewards}</Typography>
  //         <Typography fontSize={18} py={1}>Payment Status: {studentDetails.payment_status}</Typography>
  //         <Typography fontSize={18} py={1}>Repaid Amount: {studentDetails.repaid_amount}</Typography>
  //         <Typography fontSize={18} py={1}>Remainin Amount: {studentDetails.remaining_amount}</Typography>
  //       </Box>
  //     </Grid>
  //     <Grid item xs={12} lg={12} md={12} sm={12} mt={12} style={{
  //       display: "flex",
  //       justifyContent: "center"
  //     }}>
  //       {/* <Box sx> */}
  //       <Steps steps={steps} activeStep={4} />
  //       {/* </Box> */}
  //     </Grid>
  //   </Grid>
  // );
// };
export default Dashboard;