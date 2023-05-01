import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { getWalletData } from '../../redux/counter/counterSlice';
import { useSelector } from 'react-redux';
import { balanceOfAmeToken } from '../../integration/web3Client';
import './popup.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WalletDetails({ open, handleClose, logout }) {
  const walletData = useSelector(getWalletData);
  const [isCopy, setCopy] = useState(false);
  let [balance, setBalance] = useState();

  useEffect(() => {
    if (open) {
      setCopy(false);
      ameBalance();
    }
  }, [open])

  async function ameBalance() {
    balance = await balanceOfAmeToken("metamask", walletData?.account);
    console.log("AMEBalance", balance);
    setBalance(balance);
  }

  return (
    <Dialog
      className='wallet-detail'
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className='wallet-detail-title'>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon style={{ fontSize: '2rem', color: '#e4671f' }} />
        </IconButton>
        <span className='wallet-logo' >
          <img src={require("../../asset/amelogo.svg").default} width="100%" />
        </span>
      </DialogTitle>
      <DialogContent>
        <h1 className='wallet-detail-heading'> Your Wallet </h1>
        <p className='wallet-detail-address'> <span style={{ marginRight: '10px', fontSize: '1.3rem' }} >{walletData?.account}</span> <ContentCopyIcon onClick={() => { navigator.clipboard.writeText(walletData.account); setCopy(true); }} style={{ cursor: 'pointer', color: isCopy ? '#ff0a0a6e' : 'rgb(255 10 10 / 91%)' }} />  </p>
        <div className='wallet-detail-btn'>
          <p style={{ fontSize: '1.5rem', margin: '.5rem'}}> <span style={{ color: '#8b949e' }} >Balance:</span>  {walletData?.ameBalance && parseFloat(walletData?.ameBalance).toFixed(4)}
          <span style={{ marginLeft: '10px', color: 'dimgray' }}>AME</span>
           </p>
          {/* <p style={{ fontSize: '1.5rem', margin: '.5rem' }}> <span style={{ color: '#8b949e' }} >AME Token Balance:</span>  {balance} <span style={{ marginLeft: '10px' }}>AME</span> </p> */}
        </div>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button disableRipple className='btn-wallet' onClick={logout}>Disconnect</Button>
      </DialogActions>
    </Dialog>
  );
}