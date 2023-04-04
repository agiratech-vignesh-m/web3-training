import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { getisConnectAMENetwork, getWalletData, setWalletDataBalance, walletStatus } from '../../redux/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/loading';
import './details.scss';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { balanceUpdate, isUserVotedRead, quantityOfAgainstVotes, quantityOfForVotes, voteProposal, votesPercentageRead } from '../../integration/web3Client';
import ConnectWalletPopup from '../../components/popups/connectWallet';
import { ProposalStatus } from '../../constant/helpText';
import { AddressList, AddressListDrawer } from '../../components/popups/addressList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from "xlsx";
import Navigationbar from '../../container/layout/navigationbar';

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
  const dispatch = useDispatch();
  const [globalErrMsg, setGlobalErrMsg] = useState("");
  const isWalletConnected = useSelector(walletStatus);
  const walletData = useSelector(getWalletData);
  let [details, setDetails] = useState({});
  const [isVoteSubmited, setVoteSubmited] = useState(false);
  const [isVoted, setVoted] = useState(false);
  const [isAddressPopup, setAddressPopup] = useState(false);
  const [isAddressDrawer, setAddressDrawer] = useState(false);
  const [addressPopupText, setAddressPopupText] = useState('');
  const isConnectAMENetwork = useSelector(getisConnectAMENetwork);

  useEffect(() => {
    if (!isConnectAMENetwork) navigate('/proposals')
    if (location.state?.proposalId) {
      proposalDetails(location.state?.proposalId);
    }
    if (!location.state || !location.state.hasOwnProperty('title')) navigate('/proposals');
  }, []);

  useEffect(() => {
    if (!isConnectAMENetwork) navigate('/proposals')
    if (Object.keys(walletData)?.length) {
      isUserVotedForProposal();
    } else setVoted(false);
    setGlobalErrMsg('');
  }, [walletData]);

  // async function ameTokenBalance() {
  //   return new Promise(async (resolve) => {
  //     tokenBalance = await balanceOfAmeToken("metamask", walletData?.account);
  //     setTokenBalance(tokenBalance);
  //     resolve(true);
  //   })
  // }

  async function ameBalance() {
    return new Promise(async (resolve) => {
    let getBalance = await balanceUpdate("metamask", walletData?.account);
    dispatch(setWalletDataBalance(getBalance));
    resolve(true);
      })
  }

  async function votes(proposalId) {
    if (!vote) return;
    if (!isWalletConnected) {
      setOpen(true);
      return
    }
    await ameBalance();
    if (+walletData?.ameBalance <= +process.env.REACT_APP_VOTE_PROPOSAL_BALANCE) {
      setGlobalErrMsg(`Your voting power should be 1 AME atleast.`);
      return
    }
    setGlobalErrMsg('');
    let status = vote === '1';
    setVoteSubmited(true);
    voteProposal("metamask", walletData?.account, status, proposalId).then(res => {
      proposalDetails(location.state?.proposalId);
      ameBalance();
      setVoteSubmited(false);
    })
      .catch(err => {
        console.log('err', err);
        setVoteSubmited(false);
      })
  }

  async function isUserVotedForProposal() {
    let voterStatus = await isUserVotedRead("metamask", walletData?.account, location.state?.proposalId);
    setVoted(voterStatus);
    setVote(null);
  }

  async function proposalDetails(proposalId) {
    try {
      details = await votesPercentageRead("metamask", proposalId);
      setDetails(details);
      console.log('details', details);
      
    } catch (error) {
      console.log(error)
    }
  }

  function dateFormat(date) {
    if (!date) return '';
    const newDate = new Date(date);
    return moment(newDate).toString();
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (isWalletConnected);
    setOpen(false);
  }, [isWalletConnected])

  const openVoterAddress = (text) => {
    setAddressPopupText(pre => pre = text);
    setAddressPopup(true);
  }

  const openVoterAddressDrawer = (text) => {
    setAddressPopupText(pre => pre = text);
    setAddressDrawer(true);
  }

  const closeVoterAddress = useCallback(() => {
    setAddressPopup(false); 
    setAddressDrawer(false);
    setAddressPopupText('');
  }, [isAddressPopup]);

  async function forVoterDetails() {
    let addressList = await quantityOfForVotes("metamask", location.state?.proposalId);
    download(addressList, "For Voter Address");
  }

  async function againstVoterDetails() {
      let addressList = await quantityOfAgainstVotes("metamask", location.state?.proposalId);
      download(addressList, "Against Voter Address");
  }

const download = (addressList=[], text) => {
  try {
    
    let data = [];
    for (let i = 0; i < addressList.length; i++) {
        const { address, timestamp, balance } = addressList[i];
        const newDate = moment(+timestamp * 1000).utc().format();
        data.push({Address: address, Date: newDate, Votes: balance});
    }
    const fileName = text === "For Voter Address"? "For_Voter_Address": "Against_Voter_Address";
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xls";
    let xlHeader = [];
    xlHeader = text === "For Voter Address"? ["For voter address", "Date", "Wallet balance while voting"]: ["Against voter address", "Date", "Wallet balance while voting"];
    console.log('xlHeader', xlHeader);
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.sheet_add_aoa(ws, [xlHeader], { origin: "A1" });
    const colWidth = [{ width: 60 }, { width: 30 }, { width: 10 }]
    ws["!cols"] = colWidth;
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xls", type: "array" });
    const bufferBlob = new Blob([excelBuffer], { type: fileType });
    var reader = new FileReader();
    reader.readAsDataURL(bufferBlob); 
    reader.onloadend = function() {
      var base64data = reader.result;
      console.log(base64data);
      const link = document.createElement('a'); 
      link.href = base64data; 
      link.download = fileName + fileExtension; 
      document.body.appendChild(link); 
      link.click();
      document.body.removeChild(link); 
    }
    // setTimeout(() => {
        // FileSaver.saveAs(bufferBlob, fileName + fileExtension);
    // }, 500);
  } catch (error) {
    alert(error)
  }
}

  return (
    <>
    <Navigationbar />
    <div className="container">
      {isVoteSubmited && <Loading />}
      {isAddressPopup && <AddressList text={addressPopupText} proposalId={location.state?.proposalId} open={isAddressPopup} handleClose={closeVoterAddress} />}
      {isAddressDrawer && <AddressListDrawer text={addressPopupText} proposalId={location.state?.proposalId} open={isAddressDrawer} handleClose={closeVoterAddress} />}
      <Box className='user-box'
        sx={{
          width: '96%',
          height: (location.pathname === '/proposaldetail' || !isWalletConnected) ? "auto" : '80vh',
          overflow: 'overlay'
        }}
      >
        <ConnectWalletPopup open={open} handleClose={(handleClose)} />
        <Grid container spacing={2} columns={12} className='detail-main-div'>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Card className='detail-card'>
              <CardContent className='detail-card-content'>
              <div style={{ height: '30px' }} ><Button disableRipple className='detail-btn' style={{ backgroundColor: ProposalStatus[location?.state?.isActive]?.bg }} > {ProposalStatus[location?.state?.isActive]?.status} </Button></div>
                <Typography className="detail-title" gutterBottom>
                  <span className="detail-title-text"> {location.state?.title} </span>
                </Typography>
                <Divider style={{ borderColor: 'rgb(221 197 197 / 21%)' }} />
                <Typography className='detail-desc'>
                  {location.state?.description}
                </Typography>
              </CardContent>
            </Card>
            {location.state?.isActive ? <Card className='detail-voting-card'>
              <Typography className="detail-voting-title" gutterBottom>
                <span > Cast your vote </span>
              </Typography>
              <Divider style={{ borderColor: 'rgb(221 197 197 / 21%)' }} />
              <Typography className='detail-vote-btn-card'>
                <Button disableRipple className={vote === '1' ? 'btn-wallet active-vote' : 'btn-wallet inactive'} onClick={() => {setVote('1'); setGlobalErrMsg('')}} disabled={isVoted || location.state?.isActive != 1}> For </Button>
                <Button disableRipple className={vote === '0' ? 'btn-wallet active-vote' : 'btn-wallet inactive'} onClick={() => {setVote('0'); setGlobalErrMsg('')}} disabled={isVoted || location.state?.isActive != 1}> Against </Button>
                {(isVoted || location.state?.isActive != 1) ?
                  <p style={{ color: 'red', 'textAlign': 'center', fontSize: '1.3rem' }}> {isVoted ? 'User already voted!' : 'Proposal ' + ProposalStatus[location.state?.isActive].status}  </p> :
                  <Button disableRipple className='btn-wallet vote-btn' style={{ color: 'white',backgroundColor: !vote ? '#e37740ab' : '#e3611e' }} disabled={!vote || isVoteSubmited} onClick={() => votes(location.state?.proposalId)} > Vote </Button>
                }
                {globalErrMsg && <p className='vote-ame-error'> {globalErrMsg} </p>}
              </Typography>
            </Card> : <></>}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card className='detail-card-info'>
              <Typography className="detail-info-title" gutterBottom>
                <span > Information </span>
              </Typography>
              <Divider style={{ borderColor: 'rgb(221 197 197 / 21%)' }} />
              <Typography className='detail-progress-bar-card'>
                <div className='date-div'><span className='date-label'> Start date </span><span className='date-value'> {dateFormat(location.state?.start_date)} </span></div>
                <div className='date-div'><span className='date-label'> End date </span><span className='date-value'> {dateFormat(location.state?.end_date)} </span></div>
                <div className='date-div btn-dwn-xl'><span className='date-label'> For Voter Address</span>
                  {(!!details?.forVotes && +details?.forVotes >0) ? 
                  <>
                  <span className='view-value' onClick={() => openVoterAddress("For Voter Address")}> View All </span> 
                  <span className='btn-add-download' onClick={() => openVoterAddressDrawer("For Voter Address")}> View All </span> 
                  {/* <Button className='btn-add-download' onClick={forVoterDetails} variant="contained" endIcon={<FileDownloadIcon />} > .xlsx </Button> */}
                  </>
                  : <span className='date-value'> No Votes yet </span>}

                </div>
                <div className='date-div btn-dwn-xl'><span className='date-label'> Against Voter Address</span>
                  {(!!details?.againstVotes && +details?.againstVotes >0) ? <>
                  <span className='view-value' onClick={() => openVoterAddress("Against Voter Address")}> View All </span> 
                  <span className='btn-add-download' onClick={() => openVoterAddressDrawer("Against Voter Address")}> View All </span> 
                  {/* <Button className='btn-add-download' onClick={againstVoterDetails}  variant="contained" endIcon={<FileDownloadIcon />} > .xlsx </Button> */}
                  </>
                  : <span className='date-value'> No Votes yet </span>}
                </div>
              </Typography>
            </Card>
            <Card className='detail-card-info'>
              <Typography className="detail-info-title" gutterBottom>
                <span > {location.state?.isActive ? 'Current results' : 'Results'}  </span>
              </Typography>
              <Divider style={{ borderColor: 'rgb(221 197 197 / 21%)' }} />
              <Typography className='detail-progress-bar-card'>
                <div className='detail-progress-bar'> <span>For</span> <span className='value'>{details?.forVotes?? 0} %</span> </div>
                <BorderLinearProgress variant="determinate" value={details?.forVotes ?? 0} />
                <div className='detail-progress-bar'> <span>Against</span> <span className='value'>{details?.againstVotes?? 0} %</span> </div>
                <BorderLinearProgress variant="determinate" value={details?.againstVotes?? 0} />
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
    </>
  )
}

export default ProposalDetail;