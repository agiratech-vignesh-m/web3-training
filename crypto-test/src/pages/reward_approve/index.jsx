import { Box, Grid, TextField, Typography, Button, InputAdornment } from "@mui/material";
import { l2ApproveSetup, l2LoanSactionSetup, l2RewardLoanSactionSetup, l2RewardVerifySetup, l2VerifySetup } from "../../integration/web3Client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getWalletData } from '../../redux/counter/counterSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import metafox from '../../asset/MetaMask_Fox.png'

const L2RewardVerification = () => {

  const [sid, setSid] = useState();
  const [hash, setHash] = useState();
  const walletData = useSelector(getWalletData);
  const [loanDuration, setLoanDuration] = useState();
  const [rewardAmount, setRewardAmount] = useState();
  const [collegeWallet, setCollegeWallet] = useState("");
  const [uploading, setUploading] = useState(false);
  const studentid = localStorage.getItem("studentId");
  const navigate = useNavigate();
  

  const searchID = async () => {
    
    let reward_verify2 = await l2RewardVerifySetup("metamask", studentid)
  
    setHash(reward_verify2)
  }

  const updateStatus = async () => {

    setUploading(true)
    let RewardCredit = await l2RewardLoanSactionSetup("metamask", walletData?.account, studentid, rewardAmount)
    console.log("RewardCredit", RewardCredit);
    setUploading(false)
    navigate("/dashboard");
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
            Enter the Reward Amount:
          </Typography>
          <Grid container >
          <Grid item md={12} >
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
              value={rewardAmount}
              onChange={e => setRewardAmount(e.target.value)}
            />
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
            <LoadingButton variant="contained" sx={{ height: 50, ml: 3 }} loading={uploading} onClick={updateStatus}>
              Approve
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default L2RewardVerification;
