import { Box, Grid, TextField, Typography, Button, InputAdornment } from "@mui/material";
import { approveVerifyCountSetup, l2ApproveSetup, l2LoanSactionSetup, l2VerifySetup } from "../../integration/web3Client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getWalletData } from '../../redux/counter/counterSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import metafox from '../../asset/MetaMask_Fox.png'

const L2verification = () => {

  const [sid, setSid] = useState();
  const [hash, setHash] = useState();
  const walletData = useSelector(getWalletData);
  const [loanDuration, setLoanDuration] = useState();
  const [loanAmount, setLoanAmount] = useState();
  const [collegeWallet, setCollegeWallet] = useState("");
  const [uploading, setUploading] = useState(false);

  const studentid = localStorage.getItem("studentId");
  // console.log("studentid", studentid)
  const navigate = useNavigate();
  

  const searchID = async () => {
    
    let verify2 = await l2VerifySetup("metamask", sid)
  
    setHash(verify2)
    
      // console.log("Fetching data", walletData?.account, studentid, url)
  }

  const updateStatus = async (status) => {
    if(status == true){
    // setUploading(true)
    let approve2 = await l2ApproveSetup("metamask", walletData?.account, sid, status)
    let loanCredit = await l2LoanSactionSetup("metamask", walletData?.account, sid, loanDuration, collegeWallet, loanAmount)
    // setUploading(false)
    navigate("/dashboard");
  }else {
    // setUploading(true)
    let approve2 = await l2ApproveSetup("metamask", walletData?.account, sid, status)
    // let loanCredit = await l2LoanSactionSetup("metamask", walletData?.account, sid, loanDuration, collegeWallet, loanAmount)
    // setUploading(false)
    let approveCount = await approveVerifyCountSetup("metamask", studentid)
    console.log("approve1Count", approveCount)
   
    if (approveCount == false){
      navigate("/student_upload_2");
    }else {
      navigate("/rejected_page"); 
    }
    // navigate("/student_upload_2");
  }
  }

 

  return (
    <Grid container>
      <Grid
        item
        sm={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box width={"50%"} mt={3}>
          <Typography fontSize={25} fontWeight={700}>
            L2 Verificiation
          </Typography>
          <Box
            component={"form"}
            sx={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography fontSize={20}>Enter student id :</Typography>
            <TextField
              sx={{
                ml: 3,
              }}
              required
              name="student_id"
              label="Student ID"
              id="outlined-required"
              value={sid}
              onChange={e => setSid(e.target.value)}
            />
            <Button variant="contained" sx={{ height: 50, ml: 3 }} onClick={searchID}>
              Search
            </Button>
          </Box>
          <Box
            component={"form"}
            sx={{
              display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              mt: 3,
            }}
          >
            <Typography fontSize={20} >
            </Typography>
              <a href={hash} target="_blank">{hash}</a>
          </Box>
          <Typography fontSize={25} fontWeight={700} style={{marginTop: '5%'}}>
            Enter Loan Details:
          </Typography>
          <Grid container >
          <Grid item md={6} >
          <TextField
              sx={{
                marginTop: '6%'
              }}
              required
              name="loan_duration"
              label="Loan Duration"
              id="outlined-required"
              value={loanDuration}
              onChange={e => setLoanDuration(e.target.value)}
            />
          </Grid>
          <Grid item md={6} >
          </Grid>
          <Grid item md={6} >
          <TextField
              sx={{
              marginTop: '6%'
              }}
              required
              name="amount"
              label="Amount"
              id="outlined-required"
              value={loanAmount}
              onChange={e => setLoanAmount(e.target.value)}
            />
          </Grid>  
          <Grid item xs={12}>
          <TextField id="outlined-basic" placeholder='College Wallet address' variant="outlined" 
           value={collegeWallet} 
          //  readOnly={isSubmited} 
           onChange={e => setCollegeWallet(e.target.value)} 
           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={metafox}  style = {{height:"2.5rem",objectFit:'contain'}}/>
            </InputAdornment>
          ),
          }}style={{width: '100%', padding: '3% 0 5% 0'}}/>
          </Grid>
        </Grid>
          <Box
            component={"form"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ height: 50, ml: 3 }}
              onClick={() => updateStatus(false)}
            >
              Reject
            </Button>
            <LoadingButton variant="contained" sx={{ height: 50, ml: 3 }} loading={uploading} onClick={() => updateStatus(true)}>
            {/* <LoadingButton variant="contained" sx={{ height: 50, ml: 3 }} onClick={updateLoan}> */}
              Approve
            </LoadingButton>
            {/* <LoadingButton color="primary" loading={uploading} variant="contained" onClick={onSubmitHandler}>
              Upload
            </LoadingButton> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default L2verification;

// import { Box, Grid, TextField, Typography, Button } from "@mui/material";

// const L2verification = () => {
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
//         <Box width={"50%"} mt={3}>
//           <Typography fontSize={25} fontWeight={700}>
//             L2 Verificiation
//           </Typography>
//           <Box
//             component={"form"}
//             sx={{
//               display: "flex",
//               // justifyContent: "center",
//               alignItems: "center",
//               mt: 3,
//             }}
//           >
//             <Typography fontSize={20}>Enter student id :</Typography>
//             <TextField
//               sx={{
//                 ml: 3,
//               }}
//               required
//               name="student_id"
//               label="Student ID"
//               id="outlined-required"
//             />
//             <Button variant="contained" sx={{ height: 50, ml: 3 }}>
//               Search
//             </Button>
//           </Box>
//           <Box
//             component={"form"}
//             sx={{
//               display: "flex",
//               // justifyContent: "center",
//               // alignItems: "center",
//               mt: 3,
//             }}
//           >
//             <Typography fontSize={20}>
//               IPFS URL : https://ipfs.io/ipfs/
//               QmUekmQdD9stUSswQ3Y8H14YXkQUtvBU5BKXHGVG7FJcB3
//             </Typography>
//           </Box>

//           <Box
//             component={"form"}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               mt: 5,
//             }}
//           >
//             <Button
//               variant="contained"
//               color="error"
//               sx={{ height: 50, ml: 3 }}
//             >
//               Reject
//             </Button>
//             <Button variant="contained" sx={{ height: 50, ml: 3 }}>
//               Approve
//             </Button>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default L2verification;
