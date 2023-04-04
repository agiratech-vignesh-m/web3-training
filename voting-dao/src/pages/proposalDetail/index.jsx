import React, { Suspense, useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { getWalletData, selectList, walletStatus } from '../../redux/counter/counterSlice';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading';
import './details.scss';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { voteProposal } from '../../integration/web3Client';
import { getProposalDetailsRead } from '../../integration/web3Client';

import ConnectWalletPopup from '../../components/popups/connectWallet';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '1rem',
  borderRadius: 5,
  color: '#f8cc82',
  margin: '10px 0px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#f8cc82' : '#308fe8',
  },
}));
const ProposalDetail = () => {
  const [vote, setVote] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
    const [globalErrMsg, setGlobalErrMsg] = useState("");
    const listData = useSelector(selectList);
  const isWalletConnected = useSelector(walletStatus);
  // const { title=null, description=null, start_date='', end_date='', isActive=0 } = location.state;
  const walletData = useSelector(getWalletData);
  const[details, setDetails] = useState({});

  useEffect(() => {
    if (location.state?.proposalId){
      proposalDetails(location.state?.proposalId) 
    }
    if (!location.state || !location.state.hasOwnProperty('title')) navigate('/proposals');
  }, []);

//   useEffect(() => {
//     if (proposalId){
//         proposalDetails(proposalId)
//     }else{
//         alert("Error");
//     }
// }, [proposalId])

  async function votes(status, proposalId) {
    let votes = await voteProposal("matamask", walletData?.account, status, proposalId)
  }

  async function proposalDetails(proposalId) {
    let proposal = await getProposalDetailsRead("metamask", proposalId);
    console.log("Proposals", proposal);
    setDetails(proposal);
}

  function dateFormat(date) {
    // console.log("date", date);
    if (!date) return '';
    const newDate = new Date(date);
    // const UsFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    // return UsFormatter.format(newDate);
    return  moment().format('lll');
  }

  const handleVote = () => {
    if(!vote) return;
    if(!isWalletConnected) {
      setOpen(true);
      return
    }
    if(walletData?.ethBalance < 1)
        setGlobalErrMsg(`You can't create proposal. Your voting power should be 1 AME Token at least.`);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if(isWalletConnected);
      setOpen(false);
  }, [isWalletConnected])
  

  return (
<div className="container" 
          style={{ margin: "1rem" }}
          >
          <Box className='user-box'
                          sx={{
                            width: '96%',
                            height: (location.pathname ==='/proposaldetail' || !isWalletConnected)? "auto" : '80vh',
                            overflow: 'overlay',
                            '&:hover': {
                              // backgroundColor: 'primary.whitesmoke',
                              // opacity: [0.9, 0.8, 0.7],
                            },
                      }}
                    >  
                    <ConnectWalletPopup open={open} handleClose={(handleClose)} />
    <Grid container spacing={2} className='detail-main-div'>
      <Grid item xs={8}>
        <Card className='detail-card'>
          <CardContent className='detail-card-content'>
            <Typography className="detail-title" gutterBottom>
              <span > {location.state?.title} </span>
              <span>{location.state?.isActive ? <Button disableRipple className='detail-btn detail-btn-active' > Active </Button> : <Button className='detail-btn detail-btn-closed' > Closed </Button>}</span>
            </Typography>
            {/* <Typography variant="body2" className='detail-date'>
              <span> {dateFormat(location.state?.start_date)} <span style={{ color: '#8b949e' }}>to</span> {dateFormat(location.state?.end_date)}</span>
            </Typography> */}
            <Divider style={{ borderColor: 'rgb(221 197 197 / 21%)' }} />
            <Typography className='detail-desc'>
              {location.state?.description}
            </Typography>
          </CardContent>
        </Card>
      {location.state?.isActive ?  <Card className='detail-voting-card'>
        <Typography className="detail-voting-title" gutterBottom>
              <span > Cast your vote </span>
            </Typography>
            <Divider style={{ borderColor: 'rgb(221 197 197 / 21%)' }} />
          <Typography className='detail-vote-btn-card'>
                <Button disableRipple className={ vote === '1' ? 'btn-wallet active-vote': 'btn-wallet inactive'}  onClick={() => votes(true, location.state?.proposalId)} > For </Button>
                <Button disableRipple className={ vote === '0'  ? 'btn-wallet active-vote': 'btn-wallet inactive'}   onClick={() => votes(false, location.state?.proposalId)}> Against </Button>
                <Button disableRipple className='btn-wallet vote-btn' > Vote </Button>
                {globalErrMsg && <p className='vote-ame-error'> {globalErrMsg} </p>}
          </Typography>
        </Card> : <></>}
      </Grid>
      <Grid item xs={4}>
      <Card className='detail-card-info'>
        <Typography className="detail-info-title" gutterBottom>
              <span > Information </span>
            </Typography>
            <Divider style={{ borderColor: 'rgb(221 197 197 / 21%)' }} />
          <Typography className='detail-progress-bar-card'>
           <div className='date-div'><span className='date-label'> Start date </span><span className='date-value'> {dateFormat(location.state?.start_date)} </span></div>
           <div className='date-div'><span className='date-label'> End date </span><span className='date-value'> {dateFormat(location.state?.end_date)} </span></div>
           <div className='date-div'><span className='date-label'> Voter Address</span><span className='date-value'> 0x16...F3E48 </span></div>
           <div className='date-div'><span className='date-label'> Against Address</span><span className='date-value'> 0x43...GF453</span></div>
          </Typography>
        </Card>
        <Card className='detail-card-info'>
        <Typography className="detail-info-title" gutterBottom>
              <span > {location.state?.isActive ? 'Current results': 'Results'}  </span>
            </Typography>
            <Divider style={{ borderColor: 'rgb(221 197 197 / 21%)' }} />
          <Typography className='detail-progress-bar-card'>
            <div className='detail-progress-bar'> <span>For</span> <span className='value'>{details.accepters?.length ? (details.accepters?.length/details.totalVotesForProposal * 100) + '%' : '0%'}</span> </div>
            <BorderLinearProgress variant="determinate" value={details.accepters?.length ? (details.accepters?.length/details.totalVotesForProposal * 100) : 0} />
            <div className='detail-progress-bar'> <span>Against</span> <span className='value'>{details.rejecters?.length ? (details.rejecters?.length/details.totalVotesForProposal * 100) + '%' : '0%'}</span> </div>
            <BorderLinearProgress variant="determinate" value={details.rejecters?.length ? (details.rejecters?.length/details.totalVotesForProposal * 100) : 0} />
          </Typography>
        </Card>
      </Grid>
    </Grid>
                    </Box>
                    </div>
  )
}

export default ProposalDetail;