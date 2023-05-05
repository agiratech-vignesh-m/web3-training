
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { dashboardData1Setup, repayLoanSetup } from "../../integration/web3Client";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LoadingButton } from "@mui/lab";
import { getWalletData } from '../../redux/counter/counterSlice';
import { useSelector } from "react-redux";

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

const LoanDetails = () => {
    const[details, setsDetails] = useState();
    const studentid = localStorage.getItem("studentId");
    const walletData = useSelector(getWalletData);

    useEffect(() => {
      studentDetails();
    }, []);

    
    const studentDetails = async () => {
      let details = await dashboardData1Setup("metamask", studentid);
      console.log("Details of student",details)
      setsDetails(details);
    }

    const loanRepay = async() => {
      let repay = await repayLoanSetup("metamask", walletData?.account, studentid, details?.remainingInstallmentMonths);
      console.log("Details of student",repay)
    }

    return (
      <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700}} aria-label="customized table">
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
                <StyledTableCell align="right"> {details?.studentID} </StyledTableCell>
                
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell component="th" >
                Principal Plus Interest:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.principalPlusInterest} </StyledTableCell>
                
              </StyledTableRow>

              <StyledTableRow>
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
                
              </StyledTableRow>
              
              <StyledTableRow>
                <StyledTableCell component="th" >
                    Remaining Installment Month:
                </StyledTableCell>
                <StyledTableCell align="right"> {details?.remainingInstallmentMonths} </StyledTableCell>
                
              </StyledTableRow>
          
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container >
      <Typography fontSize={25} fontWeight={700} style={{marginTop: '5%'}}>
            Amount to be paid:
      </Typography>
      <Grid item md={6} >
          <TextField id="outlined-basic" variant="outlined" value={details?.remainingInstallmentMonths} style={{padding:'5%', margin:'5%'}}/>
          </Grid>
      <Grid item md={12} >
          <Button variant="contained" style={{width:"20%", padding: '1%', marginLeft: "18%"}}  onClick={loanRepay}>Pay</Button>
      </Grid> 
      </Grid>
      </Box>
    );
  }

export default LoanDetails;

// import { Grid, Box, TextField, Typography, Button } from "@mui/material";
// import React from "react";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import styled from "@emotion/styled";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function LoanDetails() {
//   const formSubmit = (e) => {
//     try {
//       e.preventDefault();
//       console.log("ee", e.target.student_id.value);
//     } catch (err) {
//       console.log("err", err);
//     }
//   };
//   return (
//     <Grid container>
//       <Grid
//         item
//         sm={12}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Student Info</StyledTableCell>
//               <StyledTableCell align="right">Status</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//               <StyledTableRow>
//                 <StyledTableCell component="th" >
//                   Student Id:
//                 </StyledTableCell>
//                 <StyledTableCell align="right"> 
//                 {/* {details?.studentID}  */}
//                 </StyledTableCell>
                
//               </StyledTableRow>
//               <StyledTableRow>
//                 <StyledTableCell component="th" >
//                   Loan Duration:
//                 </StyledTableCell>
//                 <StyledTableCell align="right"> 
//                 {/* {details?.loanDuration} */}
//                  months</StyledTableCell>
                
//               </StyledTableRow>
//               <StyledTableRow>
//                 <StyledTableCell component="th" >
//                     Profile Status:
//                 </StyledTableCell>
//                 <StyledTableCell align="right"> 
//                 {/* {details?.profileStatus}  */}
//                 </StyledTableCell>
                
//               </StyledTableRow>
//               <StyledTableRow>
//                 <StyledTableCell component="th" >
//                     Loan Released Amount:
//                 </StyledTableCell>
//                 <StyledTableCell align="right"> 
//                 {/* {details?.loanReleasedAmount}  */}
//                 </StyledTableCell>
                
//               </StyledTableRow>
//               <StyledTableRow>
//                 <StyledTableCell component="th" >
//                     Reward Status:
//                 </StyledTableCell>
//                 <StyledTableCell align="right"> 
//                 {/* {details?.rewardStatus} */}
//                  </StyledTableCell>
                
//               </StyledTableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//         <Box
//           width={"20%"}
//           component="form"
//           noValidate
//           autoComplete="off"
//           display={"flex"}
//           flexDirection={"column"}
//           alignItems={"center"}
//           justifyContent={"center"}
//           mt={4}
//           borderRadius={1}
//           py={8}
//           onSubmit={formSubmit}
//           // bgcolor={"red"}
//           boxShadow={"0px 0px 48px -15px rgba(0,0,0,0.75);"}
//         >
//           <Typography fontSize={25} fontWeight={"700"}>
//             Repay Loan
//           </Typography>
//          <TextField
//             required
//             name="amount"
//             sx={{ width: "80%", mt: 3 }}
//             id="outlined-required"
//             label="Amount"
//           />
          
//           <Button color="primary" type="submit" variant="contained" style={{marginTop: '10%'}}>
//             Pay
//           </Button>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// }

// export default LoanDetails;
